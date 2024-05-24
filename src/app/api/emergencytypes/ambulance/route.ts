import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectDB } from '@/lib/db';

export async function POST(
  request: Request,
) {
  try {
    const ambulanceUser = await getCurrentUser();
    const body = await request.json()
    const { latitude, longitude, accuracy, timestamp } = body;
    await connectDB();
    if (!ambulanceUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const postUserAmbulanceLocation = await prisma.ambulance.create({
      data: {
        latitude,
        longitude,
        accuracy,
        timestamp: new Date(timestamp),
        userId: ambulanceUser.id,
        name: ambulanceUser.name

      }
    });
    return NextResponse.json({ message: "success", postUserAmbulanceLocation}, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "failed to add location" + err });
  }
}