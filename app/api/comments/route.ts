import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

interface RequestBody {
  currentUserId: string;
  body: string;
  postId: string;
}

export async function POST(request: Request) {
  try {
    const { currentUserId, body, postId }: RequestBody = await request.json();

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUserId,
        postId,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
