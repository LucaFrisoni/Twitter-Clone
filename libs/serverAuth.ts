
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prismaDb";

const serverAuth = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Mail not found with Prisma");
  }

  return { currentUser };
};


export default serverAuth