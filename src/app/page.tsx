'use client';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function GoogleLikePage() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [inputError, setInputError] = useState(false);

    const handleInputChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setSearchValue(event.target.value);
    };

    const handleClick = () => {
        if (!searchValue || !searchValue.trim()) {
            setInputError(true);
            return;
        } else {
            setInputError(false);
        }
        router.push(`/learn/${searchValue}`);
    };

    const inputRef = useRef(null);

    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };
    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                学習したいキーワードを入力してください
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="baseline"
                sx={{ gap: 1 }}
            >
                <TextField
                    variant="outlined"
                    placeholder="docker, nginx...etc"
                    size="small"
                    value={searchValue}
                    onChange={handleInputChange}
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    error={inputError}
                    helperText={inputError && '入力してください'}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    決定
                </Button>
            </Box>
        </Paper>
    );
}
