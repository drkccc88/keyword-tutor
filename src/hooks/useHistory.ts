import { Explanation } from '@/lib/models';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useHistory(): [
    Explanation[] | undefined,
    Dispatch<SetStateAction<boolean>>,
] {
    const [val, setVal] = useState<Explanation[]>();
    const [refetch, setRefetch] = useState(true);
    useEffect(() => {
        async function fetchOrGenerate() {
            const fetchResponse = await fetch(`/api/explanation/fetchAll`, {
                method: 'GET',
            });
            if (fetchResponse.ok) {
                const data = await fetchResponse.json();
                setVal(data.data);
            }
        }
        if (refetch) {
            fetchOrGenerate();
            setRefetch(false);
        }
    }, [refetch]);

    return [val, setRefetch];
}
