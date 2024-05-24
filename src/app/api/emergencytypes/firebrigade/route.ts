import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectDB } from '@/lib/db';

export async function POST(
  request: Request,
) {
  try {
    const FireBrigadeUser = await getCurrentUser();
    const body = await request.json()
    const { latitude, longitude, accuracy, timestamp } = body;
    await connectDB();
    if (!FireBrigadeUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const postUserFireBrigadeLocation = await prisma.fireBrigade.create({
      data: {
        latitude,
        longitude,
        accuracy,
        timestamp: new Date(timestamp),
        userId: FireBrigadeUser.id,
        name: FireBrigadeUser.name

      }
    });
    return NextResponse.json({ message: "success", postUserFireBrigadeLocation}, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "failed to add location" + err });
  }
}