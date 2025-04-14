import { ask_stream } from '@/lib/openaiClient';
import { NextRequest } from 'next/server';

function buildQuizPrompt(keyword: string, count: number) {
    return `${keyword}の理解度を測る重要問題を厳選して${count}個出してください。プログラミングコードに関する問題でも構いません。設問部分は<pr>タグで囲み、選択肢部分は<ch>タグでそれぞれ囲んでください。その他の情報は一切不要です。また、マークダウンで出力してください。`;
}

// function buildQuizPrompt(keyword: string, count: number) {
//   return `${keyword}の理解度を測る重要問題を厳選して${count}個出題してください。プログラミングコードを書く記述問題でも構いません。設問部分は<pr>タグで囲み、選択式問題の場合は選択肢部分は<ch>タグでそれぞれ囲んでください。（記述問題は不要）その他の情報は一切不要です。また、マークダウンで出力してください。`
// }

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword') || '';
    const encoder = new TextEncoder();
    const generator = ask_stream(buildQuizPrompt(keyword, 10));
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
