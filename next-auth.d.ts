import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      roles: string[],
    } & DefaultSession
  }

  interface User extends DefaultUser {
    roles: string[],
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    decoded: {
      realm_access: {
        roles: string[],
      }
    },
    access_token: string,
    id_token: string,
    refresh_token: string,
    expires_at: number,
    roles: string[],
  }
}