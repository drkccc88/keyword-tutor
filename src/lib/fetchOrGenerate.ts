export async function fetchOrGenerate(
    fetchPath: string,
    generatePath: string,
    callback: (data: string) => void,
) {
    const fetchResponse = await fetch(fetchPath, {
        method: 'GET',
    });
    if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        if (data.data.length) {
            callback(data.data[0].explanation);
        }
    }

    const response = await fetch(generatePath, {
        method: 'GET',
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
        callback(message);
    }
}
