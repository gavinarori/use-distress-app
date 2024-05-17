import { prisma } from '@/lib/prisma';

export async function connectDB() {
    try {
      await prisma.$connect();
    } catch (err) {
      return Error("Database Connection failed");
    }
  }