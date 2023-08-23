import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

interface RequestBody {
  currentUserId: string;
  postId: string;
}

export async function POST(request: Request) {
  try {
    const { postId, currentUserId }: RequestBody = await request.json();

    const postLiked = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postLiked) {
      throw new Error("Invalid ID");
    }

    let updatedLikeIDS = [...(postLiked?.likeIds || [])];

    updatedLikeIDS.push(currentUserId);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeIds: updatedLikeIDS,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const currentUserId = searchParams.get("currentUserId");

    if (postId) {
      const postLiked = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!postLiked) {
        throw new Error("Invalid ID");
      }
      let updatedLikeIDS = [...(postLiked?.likeIds || [])];

      updatedLikeIDS = updatedLikeIDS.filter((i) => i != currentUserId);

      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likeIds: updatedLikeIDS,
        },
      });
      return NextResponse.json(updatedPost, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
