import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

type decodedToken = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  realm_access: { 
    roles: string[] 
  }
}

export default async function refreshToken(token: JWT) {
  const res = await fetch(`${process.env.KEYCLOAK_ISSUER as string}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID as string,
      client_secret: process.env.KEYCLOAK_SECRET as string,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
  });
  
  const refreshToken = await res.json();
  if (!res.ok) throw refreshToken;

  const now = Math.floor(Date.now() / 1000);

  const decodedAccessToken: decodedToken = jwtDecode(refreshToken.access_token)

  return {
    ...token,
    decoded: decodedAccessToken,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    refresh_token: refreshToken.refresh_token,
    expires_at: now + refreshToken.expires_in,
    roles: decodedAccessToken.realm_access.roles
  } as JWT;
}