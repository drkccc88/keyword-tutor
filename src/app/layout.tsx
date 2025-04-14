'use client';

import './globals.css';
import CSR from '@/conponents/CSR';
import { ResponsiveAppBar } from '@/conponents/appBar';
import { Container } from '@mui/material';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <CSR>
                    <ResponsiveAppBar />
                    <Container maxWidth="md" sx={{ mt: 10 }}>
                        {children}
                    </Container>
                </CSR>
            </body>
        </html>
    );
}
