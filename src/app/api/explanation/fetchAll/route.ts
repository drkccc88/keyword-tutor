import connectDB from '@/lib/database';
import { ExplanationModel } from '@/lib/models';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    const data = await ExplanationModel.find();
    return NextResponse.json({ data: data });
}
