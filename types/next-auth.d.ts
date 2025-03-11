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
  }
}

// import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     accessToken?: string;
//     provider?: string;
//   }

//   interface User extends DefaultUser {
//     userId?: number;
//     accessToken?: string;
//     provider?: string;
//     roles: ?string[];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     provider?: string;
//   }
// }
