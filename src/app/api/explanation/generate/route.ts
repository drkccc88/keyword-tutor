import { ask_stream } from '@/lib/openaiClient';
import { NextRequest } from 'next/server';

function buildQuizPrompt(keyword: string) {
    return `${keyword}について、分かりやすく、開発者が知っておくべき情報を教えてください。出力形式はmarkdown形式でお願いします。絵文字とか適度に使ってok`;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword') || '';
    const encoder = new TextEncoder();
    const generator = ask_stream(buildQuizPrompt(keyword));
    const readableStream = new ReadableStream({
        async start(controller) {
            for await (const value of generator) {
                controller.enqueue(encoder.encode(value));
            }
            controller.close();
        },
    });

    return new Response(readableStream, {
        headers: { 'Content-Type': 'application/json' },
    });
}
