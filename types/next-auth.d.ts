import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    email: string;
    roles: string[];
    provider?: string;
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    id: string;
    email: string;
    roles: string[];
    expiresAt: string;
  }
}
