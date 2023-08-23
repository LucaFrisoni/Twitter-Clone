import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismaDb";
import { toast } from "react-hot-toast";


const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          toast.error("Invalid credentials"); // Mostrar mensaje de error utilizando toast
          return null; //
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          console.log("aca es 2");
          toast.error("You must put a password"); // Mostrar mensaje de error utilizando toast
          return null; //
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          console.log("aca es 3");
          toast.error("Password Incorrect"); // Mostrar mensaje de error utilizando toast
          return null; //
        }

      
        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV == "development",
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
