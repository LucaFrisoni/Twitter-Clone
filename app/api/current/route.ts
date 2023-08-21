import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
