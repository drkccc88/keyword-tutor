import connectDB from '@/lib/database';
import { SingleQuizModel } from '@/lib/models';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    const data = await SingleQuizModel.find();
    return NextResponse.json({ data: data });
}
