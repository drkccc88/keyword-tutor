import connectDB from '@/lib/database';
import { QuizModel } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    await QuizModel.create(body);
    return NextResponse.json({ message: 'ok' });
}
