import { getServerSession } from "next-auth";
import { authOptions } from "../../[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req })

  if (session && token) {
    const query = `id_token_hint=${token.id_token}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL as string)}` 
    const url = `${process.env.KEYCLOAK_ISSUER as string}/protocol/openid-connect/logout?${query}`;
    try {
      await fetch(url, { method: "GET" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500 });
    }
  }
  
  return NextResponse.json({ status: 200 })
};