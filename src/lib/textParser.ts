import { Parser } from 'htmlparser2';

type QuizData = {
    pr: string;
    quiz: string[];
};

export function parseQuizText(text: string): QuizData[] {
    /*
    input:
    -----------
    <pr>問題1:hogehoge</pr>
    <ch>1.a</ch>
    <ch>2.a</ch>
    <ch>3.a</ch>
    <ch>4.a</ch>

    <pr>問題2:hugahuga</pr>
    <ch>1.b</ch>
    <ch>2.b</ch>
    <ch>3.b</ch>
    <ch>4.b</ch>
    -----------

    output:
    [
        {pr: "問題1:hogehoge", quiz: ["1.a", "2.a", "3.a", "4.a"]},
        {pr: "問題2:hugahuga", quiz: ["1.b", "2.b", "3.b", "4.b"]},
    ]
    */
    const sections = text.split(/(?=<pr>|<ch>)/).filter(Boolean);

    const result: QuizData[] = [];
    let currentPr = '';
    let currentAns: string[] = [];

    sections.forEach((section) => {
        if (section.startsWith('<pr>')) {
            // １つ前に設定したprとansをresultに追加
            if (currentPr) {
                result.push({ pr: currentPr, quiz: currentAns });
            }
            currentPr = section.replace(/<\/?pr>/g, '').trim();
            currentAns = [];
        } else if (section.startsWith('<ch>')) {
            currentAns.push(section.replace(/<\/?ch>/g, '').trim());
        }
    });

    // 最後に設定したprとansをresultに追加
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
