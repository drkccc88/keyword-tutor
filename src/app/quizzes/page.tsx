'use client';

import { Loading } from '@/conponents/loading';
import { Quiz } from '@/conponents/quiz';
import { useSingleQuiz } from '@/hooks/useSingleQuiz';
import { Typography } from '@mui/material';

export default function Quizzes() {
    const [quizzes, setRefetch] = useSingleQuiz();

    if (!quizzes) {
        return <Loading />;
    }

    if (quizzes?.length === 0) {
        return (
            <Typography textAlign={'center'}>
                保存した理解度テストはありません
            </Typography>
        );
    }

    return (
        <>
            {quizzes.map((q, i) => (
                <Quiz
                    key={i}
                    probrem={q.probrem}
                    choices={q.choices}
                    index={i}
                    keyword={q.keyword}
                    setRefetch={setRefetch}
                    quizId={q._id}
                />
            ))}
        </>
    );
}
