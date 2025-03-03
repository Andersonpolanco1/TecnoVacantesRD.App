import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_VACANCIES_AUTH_API_URL}/api/auth/providers`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                provider: account.provider,
                providerAccessToken: account.access_token,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            token.accessToken = data.accessToken;
            token.expiresAt = new Date(data.expiresAt).toISOString();
          } else {
            console.error("Error:", await response.text());
          }
        } catch (error) {
          console.error("Error enviando el token al backend:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider;
      session.accessToken = token.accessToken;
      session.expires = String(token.expiresAt);
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
