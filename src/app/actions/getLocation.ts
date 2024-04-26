import { prisma } from '@/lib/prisma';
import getSession from "./getSession";

const getLocation = async () => {
    try {
        const userSession = await getSession();

        if (!userSession || !userSession.user || !userSession.user.id) {
            return null;
        }

        const userId = userSession.user.id;
        const lastLocation = await prisma.location.findFirst({
            where: { userId },
            orderBy: { timestamp: 'desc' }, 
        });

        return lastLocation;
    } catch (error) {
        console.error("Error fetching location:", error);
        return null;
    }
};

export default getLocation;
