import connectDB from '@/lib/database';
import { ExplanationModel } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    await ExplanationModel.create(body);
    return NextResponse.json({ message: 'ok' });
}
