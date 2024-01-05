import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
  userId?: string;
}

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error('Database Connection failed');
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { latitude, longitude, accuracy } = await req.json();
    await main();

    const locationData: LocationData = {
      latitude,
      longitude,
      accuracy,
      timestamp: new Date(),
      // If userId is optional, you can leave it undefined or provide a valid string.
      // userId: 'someUserId', 
    };

    const location = await prisma.location.create({
      data: {
        ...locationData,
        // If userId is provided, connect it to an existing user.
        user: locationData.userId
          ? {
              connect: { id: locationData.userId },
            }
          : undefined,
      },
    });

    return NextResponse.json({ message: 'Success', location }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
