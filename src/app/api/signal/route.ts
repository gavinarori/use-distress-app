import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { Latitude, Longitude, accuracy, Timestamp } = req.body;
      const { userId } = req.body;

      const createdLocation = await prisma.location.create({
        data: {
          latitude: Latitude,
          longitude: Longitude,
          accuracy,
          timestamp: Timestamp,
          user: {
            connect: { id: userId },
          },
        },
      });

      res.status(200).json({ success: true, location: createdLocation });
    } catch (error) {
      console.error('Error creating location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
