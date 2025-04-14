import { useAnswer } from '@/hooks/useAnswer';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
    probrem: string;
    choices: string[];
    index: number;
    keyword?: string;
    params?: Promise<{ keyword: string }>;
    setRefetch?: (refetch: boolean) => void;
    quizId?: string;
};

export function Quiz({
    probrem,
    choices,
    index,
    params,
    keyword,
    setRefetch,
    quizId,
}: Props) {
    const [value, setValue] = useState('');
    const [answer, setCheck] = useAnswer(value, probrem, choices);
    const [saveStatus, setSaveStatus] = useState<null | 'saving' | 'saved'>(
        null,
    );

    const handleChangeValue = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCheck(true);
    };

    const saveSingleQuiz = async () => {
        let keyword = '';
        if (params) {
            keyword = (await params).keyword;
        }
        setSaveStatus('saving');
        await fetch('/api/singleQuiz/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keyword,
                probrem,
                choices,
            }),
        });
        setSaveStatus('saved');
    };

    const quizTitle = keyword
        ? `- ${keyword} - 問${index + 1}`
        : `問${index + 1}`;

    const onDelete = async () => {
        await fetch('/api/singleQuiz/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: quizId }),
        });
        setRefetch?.(true);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <form onSubmit={handleSubmit}>
                <FormControl
                    sx={{ m: 3, display: 'flex' }}
                    error={answer.error}
                    variant="standard"
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>{quizTitle}</Typography>
                        {keyword && (
                            <IconButton onClick={onDelete}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </div>
                    <ReactMarkdown>{probrem}</ReactMarkdown>
                    <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="quiz"
                        value={value}
                        onChange={handleChangeValue}
                    >
                        {choices.map((ch, i) => {
                            if (Number(answer.answer) < 0) {
                                return (
                                    <FormControlLabel
                                        key={i}
                                        value={i + 1}
                                        control={<Radio />}
                                        label={ch}
                                    />
                                );
                            }
                            return (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <FormControlLabel
                                        value={i + 1}
                                        control={<Radio />}
                                        label={ch}
                                    />
                                    {choices.length &&
                                        Number(answer.answer) - 1 === i && (
                                            <CheckIcon color="success" />
                                        )}
                                </div>
                            );
                        })}
                    </RadioGroup>
                    {Number(answer.answer) > 0 && (
                        <FormHelperText
                            color={answer.error ? 'error' : 'success'}
                        >
                            {answer.error ? '不正解' : '正解'}
                        </FormHelperText>
                    )}
                    <FormHelperText>{answer.helperText}</FormHelperText>
                    {Number(answer.answer) > 0 && !keyword ? (
                        <Button
                            sx={{ mt: 1, mr: 1, width: 200 }}
                            variant="outlined"
                            onClick={() => saveSingleQuiz()}
                            disabled={saveStatus !== null}
                        >
                            {saveStatus === 'saved'
                                ? '保存しました'
                                : 'あとでテストする'}
                        </Button>
                    ) : (
                        <Button
                            sx={{ mt: 1, mr: 1, width: 200 }}
                            type="submit"
                            variant="outlined"
                        >
                            正解を確認する
                        </Button>
                    )}
                </FormControl>
            </form>
        </Paper>
    );
}
