import { parseQuizText } from '@/lib/textParser';
import { useEffect, useState } from 'react';

export function useQuiz(
    params: Promise<{ keyword: string }>,
): ReturnType<typeof parseQuizText> | undefined {
    const [val, setVal] = useState<ReturnType<typeof parseQuizText>>();
    useEffect(() => {
        async function fetchOrGenerate() {
            const { keyword } = await params;
            const fetchResponse = await fetch(
                `/api/quiz/fetch?keyword=${keyword}`,
                {
                    method: 'GET',
                },
            );
            if (fetchResponse.ok) {
                const data = await fetchResponse.json();
                if (data.data.length) {
                    setVal(parseQuizText(data.data[0].quiz));
                    return;
                }
            }

            const response = await fetch(
                `/api/quiz/generate?keyword=${keyword}`,
                {
                    method: 'GET',
                },
            );
            if (!response.body) {
                console.error('ReadableStream not supported in this browser.');
                return;
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let message = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const v = decoder.decode(value, { stream: true });
                message += v;
                setVal(parseQuizText(message));
            }
            await fetch(`/api/quiz/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keyword: decodeURIComponent(keyword),
                    quiz: message,
                }),
            });
        }

        fetchOrGenerate();
    }, [params]);

    return val;
}
