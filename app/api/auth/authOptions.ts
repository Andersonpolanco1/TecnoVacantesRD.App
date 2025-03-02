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
            "https://localhost:7263/api/auth/providers",
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
            token.accessToken = data.access_token;
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
      return session;
    },
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
