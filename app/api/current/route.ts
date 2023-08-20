import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export  async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
// export async function GET(request: Request) {
//   try {
//     const { currentUser } = await serverAuth(request);

//     return NextResponse.json(currentUser, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }