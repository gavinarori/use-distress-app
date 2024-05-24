import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectDB } from '@/lib/db';

export async function POST(
  request: Request,
) {
  try {
    const FirstAidUser = await getCurrentUser();
    const body = await request.json()
    const { latitude, longitude, accuracy, timestamp } = body;
    await connectDB();
    if (!FirstAidUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const postUserFirstAidLocation = await prisma.firstAid.create({
      data: {
        latitude,
        longitude,
        accuracy,
        timestamp: new Date(timestamp),
        userId: FirstAidUser.id,
        name: FirstAidUser.name

      }
    });
    return NextResponse.json({ message: "success", postUserFirstAidLocation}, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "failed to add location" + err });
  }
}