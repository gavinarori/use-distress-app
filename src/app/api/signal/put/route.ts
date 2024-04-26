import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { main } from "../route";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getLocation from '@/app/actions/getLocation';

export const PUT = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const currentUser = await getCurrentUser();
        const location = await getLocation();

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (location !== null) {
            const updateLocation = await prisma.location.update({
                where: { id: location.id as string },
                data: {
                    isCanceled: true,
                },
            });

            if (!updateLocation) {
                return  NextResponse.json({ message: "Location not found" }, { status: 404 });
            }

            return  NextResponse.json({ message: "Location updated successfully", updateLocation }, { status: 200 });
        }

        return new NextResponse('Location not found', { status: 404 });
    } catch (err) {
        return  NextResponse.json({ message: "Error", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

