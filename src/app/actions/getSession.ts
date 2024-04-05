import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function getSession() {
  return await getServerSession(authOptions);
}