import { SingleQuiz } from '@/lib/models';
import { useEffect, useState } from 'react';

export function useSingleQuiz(): [
    SingleQuiz[] | undefined,
    (refetch: boolean) => void,
] {
    const [val, setVal] = useState<SingleQuiz[]>();
    const [refetch, setRefetch] = useState(true);
    useEffect(() => {
        async function fetchOrGenerate() {
            const fetchResponse = await fetch(`/api/singleQuiz/fetchAll`, {
                method: 'GET',
            });
            if (fetchResponse.ok) {
                const data = await fetchResponse.json();
                setVal(data.data);
                return;
            }
        }
        if (refetch) {
            fetchOrGenerate();
            setRefetch(false);
        }
    }, [refetch]);

    return [val, setRefetch];
}
