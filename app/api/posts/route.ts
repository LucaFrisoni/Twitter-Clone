import bcrypt from "bcrypt";
import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import { useUserEmail } from "@/hooks/useUser";

interface RequestBody {
  email: string;
  body: string;
}

export async function POST(request: Request) {
  try {
    const { email, body }: RequestBody = await request.json();
    const user = await useUserEmail(email);
    const post = await prisma.post.create({
      data: {
        body,
        userId: user.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (email) {
      const user = await useUserEmail(email);
      const posts = await prisma.post.findMany({
        where: { userId: user.id },
        include: { user: true, comments: true },
      });
      return NextResponse.json(posts, { status: 200 });
    } else {
      const posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
      });
      return NextResponse.json(posts, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
