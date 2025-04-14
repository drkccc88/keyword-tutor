import { ask_stream } from '@/lib/openaiClient';
import { NextRequest } from 'next/server';

function buildQuizPrompt(probrem: string, choices: string[], answer?: string) {
    return `${probrem}の問題で、選択肢は${choices.join(',')}です。${answer}番目の選択肢と解答しました。採点してください。<result>タグで正解or不正解を囲み、<ans>タグで正解番号(数字)を囲み、解説部分は<sol>タグで囲み、その他の情報は一切不要です。`;
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const encoder = new TextEncoder();
    const generator = ask_stream(
        buildQuizPrompt(body.probrem, body.choices, body.answer),
    );
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
