import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSession } from "@/app/api/auth/authOptions";
import Providers from "./providers/appSessionProvider";
import Navbar from "@/components/Navbar";
import { LoadingProvider } from "./providers/loadingProvider";
import AppSessionProvider from "./providers/appSessionProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="es">
      <head>
        <title>TecnoVacantesRD</title>
      </head>
      <body>
        {/* Barra de navegación */}
        <AppSessionProvider session={session}>
          <LoadingProvider>
            <Navbar></Navbar>
            <div className="d-flex flex-column min-vh-100 pt-5 mt-3">
              <main className="flex-grow-1 container">{children}</main>
              <footer className="bg-dark text-white text-center py-3">
                <p>
                  &copy; 2025 TecnoVacantesRD. Todos los derechos reservados.
                </p>
              </footer>
            </div>
          </LoadingProvider>
        </AppSessionProvider>

        {/* Scripts de Bootstrap */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
