import { parseAnserText } from '@/lib/textParser';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Answer = {
    answer: string;
    helperText: string;
    error: boolean;
};

export function useAnswer(
    selectNumber: string,
    probrem: string,
    choices: string[],
): [Answer, Dispatch<SetStateAction<boolean>>] {
    const [check, setCheck] = useState(false);
    const [answer, setAnswer] = useState<Answer>({
        answer: '',
        helperText: '',
        error: false,
    });
    useEffect(() => {
        async function fetchOrGenerate() {
            const response = await fetch('/api/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    probrem,
                    choices,
                    answer: selectNumber,
                }),
            });
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
                const ans = parseAnserText(message);
                setAnswer({
                    answer: ans.answer,
                    error: ans.answer.trim() !== selectNumber,
                    helperText: ans.solution,
                });
            }
        }
        if (check) {
            fetchOrGenerate();
            setCheck(false);
        }
    }, [selectNumber, probrem, choices, check, answer]);

    return [answer, setCheck];
}
