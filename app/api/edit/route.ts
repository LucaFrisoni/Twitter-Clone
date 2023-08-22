import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  name?: string;
  username?: string;
  bio?: string;
  coverImage?: string;
  profileImage?: string;
}

export async function PATCH(request: Request) {
  const { email, ...updateFields }: RequestBody = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email }, // Buscar por el email proporcionado
      data: { ...updateFields }, // Actualizar los campos proporcionados
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
