import { apiRequestClient } from "@/lib/utils";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { User } from "next-auth";
import { ApiTokenResponse } from "@/types/dtos/apiTokenResponse";

const authOptions: AuthOptions = {
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const response = await apiRequestClient<ApiTokenResponse>(
          `${process.env.NEXT_PUBLIC_VACANCIES_AUTH_API_URL}/api/auth/login`,
          "POST",
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        if (!response.success || !response.data?.accessToken) {
          throw new Error("Credenciales inválidas");
        }

        const accessToken = response.data.accessToken;
        const decodedToken: any = jwt.decode(accessToken);

        return {
          accessToken,
          id: decodedToken?.sub, // Ajusta según el claim de tu token
          email: decodedToken?.email,
          roles:
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] || [],
        } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 43200, // 12h
    updateAge: 3600, // Actualiza el token cada 1 hora
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (!account || !token) return token;

      if (
        token.accessToken &&
        token.expiresAt &&
        new Date(token.expiresAt) > new Date()
      ) {
        return token;
      }

      if (account.provider === "google") {
        const providerResponse = await apiRequestClient<ApiTokenResponse>(
          `${process.env.NEXT_PUBLIC_VACANCIES_AUTH_API_URL}/api/auth/register-with-providers`,
          "POST",
          {
            provider: account.provider,
            providerAccessToken: account.access_token,
          }
        );

        if (providerResponse.success && providerResponse.data?.accessToken) {
          const decodedToken: any = jwt.decode(
            providerResponse.data.accessToken
          );
          token.accessToken = providerResponse.data.accessToken;
          token.id = decodedToken?.sub;
          token.email = decodedToken?.email;
          token.expiresAt = new Date(decodedToken?.exp * 1000).toISOString();
          token.roles =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] || [];

          return token;
        }
      }

      if (account?.provider === "email") {
        console.log("jwt() Es email");
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      (session.expires = token.expiresAt),
        (session.user = {
          id: token.id,
          email: token.email,
          roles: token.roles,
          accessToken: token.accessToken,
        });
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
