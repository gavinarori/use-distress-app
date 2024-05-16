import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { connectDB } from "../db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connectDB();
    const currentUser = await getCurrentUser();
    if(!currentUser?.id){
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const getCurrentLocation = await prisma.location.findMany()
    if (!getCurrentLocation){
        return NextResponse.json({ message: "Location not found", }, { status: 404 })
    }
    return NextResponse.json({ message: "success", getCurrentLocation }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};