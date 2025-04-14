'use client';

import { Quiz } from '@/conponents/quiz';
import { useSingleQuiz } from '@/hooks/useSingleQuiz';

// import { EnhancedTable } from '@/conponents/historyTable';

export default function Quizzes() {
    const [quizzes, setRefetch] = useSingleQuiz();
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
