import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { main } from "../route";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();


    
    const currentUser = await getCurrentUser();

    // Validate userId, if necessary

    // Fetch user's location based on userId
    const getLocation = await prisma.location.findFirst({
      where: {
        userId: currentUser.id , // Assuming userId is a string
      },
    });

    // Check if location is found
    if (!getLocation)
      return NextResponse.json({ message: "Location not found" }, { status: 404 });

    // Return the location
    return NextResponse.json({ message: "Success", location: getLocation }, { status: 200 });
  } catch (err) {
    // Handle errors
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  } finally {
    // Disconnect from Prisma
    await prisma.$disconnect();
  }
};
