import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

export async function* ask_stream(content: string) {
    const stream = await openai.chat.completions.create({
        messages: [{ role: 'user', content: content }],
        //    model: "gpt-3.5-turbo",
        model: 'gpt-4o-mini',
        stream: true,
    });

    for await (const message of stream) {
        const token = message.choices[0].delta.content;
        if (token) {
            yield token;
        }
    }
}
