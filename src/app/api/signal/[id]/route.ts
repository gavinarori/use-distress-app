import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { main } from "../route";


  export const GET = async (req: Request, res: NextResponse) => {
    try {
      await main();
      const getLocation = await prisma.location.findFirst();
      if (!getLocation)
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
      return NextResponse.json({ message: "Success", getLocation }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };