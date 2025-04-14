import { useEffect, useState } from 'react';

export function useExplanation(
    params: Promise<{ keyword: string }>,
): string | undefined {
    const [val, setVal] = useState<string>();
    useEffect(() => {
        async function fetchOrGenerate() {
            const { keyword } = await params;
            const fetchResponse = await fetch(
                `/api/explanation/fetch?keyword=${keyword}`,
                {
                    method: 'GET',
                },
            );
            if (fetchResponse.ok) {
                const data = await fetchResponse.json();
                if (data.data.length) {
                    setVal(data.data[0].explanation);
                    return;
                }
            }

            const response = await fetch(
                `/api/explanation/generate?keyword=${keyword}`,
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
                setVal(message);
            }
            await fetch(`/api/explanation/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keyword: decodeURIComponent(keyword),
                    explanation: message,
                    createDate: new Date(),
                }),
            });
        }

        fetchOrGenerate();
    }, [params]);

    return val;
}
