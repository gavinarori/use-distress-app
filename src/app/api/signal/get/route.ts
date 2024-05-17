import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { connectDB} from "../../../../lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connectDB();
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return  NextResponse.json('Unauthorized', { status: 401 });
    }

    const getCurrentLocation = await prisma.location.findMany();
    if (getCurrentLocation.length === 0) {
      return  NextResponse.json({ message: "Location not found" }, { status: 404 });
    }

    const lastLocation = getCurrentLocation[getCurrentLocation.length - 1];
    return  NextResponse.json({ message: "success", lastLocation }, { status: 200 });

  } catch (err) {
    return  NextResponse.json({ message: "Error", error: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
