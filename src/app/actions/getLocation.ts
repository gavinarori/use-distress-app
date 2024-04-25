import { prisma } from '@/lib/prisma';
import getSession from "./getSession";

const getLocation  = async () => {
    try{
        const userSession = await getSession()
        if (!userSession?.user.email) {
            return null
        }

        const currentLocation = await prisma.location.findUnique({
          where: { id: userSession.user.id },});

          if (!currentLocation) {
            return null;
          }

          return  currentLocation;
    }catch (error: any) {
        return null;
      }
        };

export default getLocation;