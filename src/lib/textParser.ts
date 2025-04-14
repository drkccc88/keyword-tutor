import { Parser } from 'htmlparser2';

type QuizData = {
    pr: string;
    quiz: string[];
};

export function parseQuizText(text: string): QuizData[] {
    const sections = text.split(/(?=<pr>|<ch>)/).filter(Boolean);

    const result: QuizData[] = [];
    let currentPr = '';
    let currentAns: string[] = [];

    sections.forEach((section) => {
        if (section.startsWith('<pr>')) {
            // 現在の質問とその選択肢を一緒に保存
            if (currentPr) {
                result.push({ pr: currentPr, quiz: currentAns });
            }
            // <pr>タグの内容を取得
            currentPr = section.replace(/<\/?pr>/g, '').trim();
            currentAns = [];
        } else if (section.startsWith('<ch>')) {
            // <ch>タグの内容を現在の選択肢リストに追加
            currentAns.push(section.replace(/<\/?ch>/g, '').trim());
        }
    });

    // 最後の<pr>タグとその選択肢を忘れずに追加
    if (currentPr) {
        result.push({ pr: currentPr, quiz: currentAns });
    }

    return result;
}

type AnsData = {
    answer: string;
    solution: string;
};

export function parseAnserText(text: string): AnsData {
    const result: AnsData = { answer: '', solution: '' };
    let currentTag: string | null = null;

    const parser = new Parser(
        {
            onopentag(name) {
                if (name === 'ans') {
                    currentTag = 'ans';
                } else if (name === 'sol') {
                    currentTag = 'sol';
                }
            },
            ontext(text) {
                if (currentTag === 'ans') {
                    result.answer += text;
                } else if (currentTag === 'sol') {
                    result.solution += text;
                }
            },
        },
        { decodeEntities: true },
    );

    parser.write(text);
    parser.end();

    return result;
}
