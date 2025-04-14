import connectDB from '@/lib/database';
import { ExplanationModel } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword') || '';
    await connectDB();
    const data = await ExplanationModel.find({ keyword: keyword });
    return NextResponse.json({ data: data });
}
