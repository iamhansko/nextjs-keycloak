import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/options";
// import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const token = await getToken({ req });

//   if (session && token) {
//     const url = `${process.env.BACKEND_URL}/api/v1/resources`;

//     const postBody = await req.json();

//     const result = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token.access_token,
//       },
//       method: "POST",
//       body: JSON.stringify(postBody),
//     });

//     if (result.ok) {
//       const data = await result.json();
//       return NextResponse.json({ data }, { status: result.status });
//     }
    
//     return NextResponse.json(
//       { error: await result.text() },
//       { status: result.status }
//     );
//   }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}