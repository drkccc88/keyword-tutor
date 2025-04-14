import connectDB from '@/lib/database';
import { SingleQuizModel } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    const query = { _id: { $in: body.ids } };
    await SingleQuizModel.deleteMany(query);
    return NextResponse.json({});
}
