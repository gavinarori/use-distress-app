// route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    handlePost(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { Latitude, Longitude, accuracy, timestamp, userId } = await req.body;

    const createdLocation = await prisma.location.create({
      data: {
        latitude: Latitude,
        longitude: Longitude,
        accuracy: accuracy,
        timestamp: timestamp,
        user: {
          connect: { id: userId },
        },
      },
    });

    const response = res.status(200).json({ success: true, location: createdLocation });
    console.log(response);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
