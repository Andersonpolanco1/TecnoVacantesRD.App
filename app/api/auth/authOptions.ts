import { apiRequest } from "@/lib/utils";
import { ApiResponse } from "@/types/dtos/ApiResponse";
import { ApiTokenResponse } from "@/types/dtos/apiTokenResponse";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 43200, //12h from now
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const response = await apiRequest<ApiTokenResponse>(
          `${process.env.NEXT_PUBLIC_VACANCIES_AUTH_API_URL}/api/auth/providers`,
          "POST",
          "",
          {
            provider: account.provider,
            providerAccessToken: account.access_token,
          }
        );

        if (response.success) {
          token.accessToken = response.data?.accessToken;
        } else {
          throw new Error(response.message);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider;
      session.accessToken = token.accessToken;
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

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
