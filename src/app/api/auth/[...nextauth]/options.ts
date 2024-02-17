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
    async jwt({ token, user }) {
      if (user) token.role = user.role
      // if (user) token.role = 'admin'
      // if (user) token.role = 'partner'
      return token
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      // if (session?.user) session.user.role = 'admin'
      // if (session?.user) session.user.role = 'partner'
      return session
    }
  }
}