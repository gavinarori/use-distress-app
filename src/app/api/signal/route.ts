import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectDB } from '../../../lib/db';

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json()
    const { latitude, longitude, accuracy, timestamp } = body;
    await connectDB();
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const currentLocation = await prisma.location.create({
      data: {
        latitude,
        longitude,
        accuracy,
        timestamp: new Date(timestamp),
        userId: currentUser.id 
      }
    });
    return NextResponse.json({ message: "success", currentLocation }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "failed to add location" + err });
  }
}
