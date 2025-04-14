import connectDB from '@/lib/database';
import { ExplanationModel } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    const query = { keyword: { $in: body.keywords } };
    await ExplanationModel.deleteMany(query);
    return NextResponse.json({});
}
