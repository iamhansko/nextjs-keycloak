import refreshToken from "@/utils/refreshTokenRotation";
import { jwtDecode } from "jwt-decode";
import type { AuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID as string,
      clientSecret: process.env.KEYCLOAK_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);
      // Following Data will be Encrypted
      if (account) {
        token.decoded = jwtDecode(account.access_token as string);
        token.access_token = account.access_token as string;
        token.id_token = account.id_token as string;
        token.expires_at = account.expires_at as number;
        token.refresh_token = account.refresh_token as string;
        token.roles = token.decoded.realm_access.roles as string[];
        return token
      } else if (now < token.expires_at) {
        return token;
      } else {
        const newToken = await refreshToken(token);
        return newToken;
      }
    },
    async session({ session, token }) {
      // Following Data will "not" be Encrypted
      if (session?.user) session.user.roles = token.decoded.realm_access.roles;
      return session
    }
  }
}