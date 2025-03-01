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
      // Si el usuario se autentica, guarda el access_token en el token JWT
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      // Agregar accessToken y provider al objeto de sesión
      session.provider = token.provider;

      // Solo enviar al backend si aún no se ha enviado
      if (token.accessToken && !token.tokenSent) {
        try {
          var response = await fetch(
            "https://localhost:7263/api/auth/providers",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Esto asegura que las cookies sean enviadas con la solicitud
              body: JSON.stringify({
                provider: token.provider,
                providerAccessToken: token.accessToken,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            session.accessToken = data.access_token;

            // Aquí puedes manejar el access_token, por ejemplo, guardarlo en cookies
          } else {
            console.error("Error:", await response.text());
          }
          token.tokenSent = true;
        } catch (error) {
          console.error("Error enviando el token al backend:", error);
        }
      }

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
