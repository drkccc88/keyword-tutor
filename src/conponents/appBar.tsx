import HistoryIcon from '@mui/icons-material/History';
import QuizIcon from '@mui/icons-material/Quiz';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const pages = ['history', 'quiz'] as const;

function getPageIcon(page: (typeof pages)[number]) {
    switch (page) {
        case 'history':
            return <HistoryIcon />;
        case 'quiz':
            return <QuizIcon />;
    }
}

export function ResponsiveAppBar() {
    const router = useRouter();

    const onClickNavIcon = (page: (typeof pages)[number]) => {
        switch (page) {
            case 'history':
                router.push('/history');
                break;
            case 'quiz':
                router.push('/quizzes');
                break;
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => router.push('/')}
                        sx={{
                            mr: 2,
                            display: {
                                xs: 'none',
                                md: 'flex',
                                cursor: 'pointer',
                            },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Keyword Tutor
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => onClickNavIcon(page)}
                                sx={{ my: 2, color: 'white', display: 'flex' }}
                            >
                                {getPageIcon(page)}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
