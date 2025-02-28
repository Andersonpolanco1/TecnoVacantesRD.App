"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import config from "@/config/config_dev";

export default function GoogleAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get("code");

  useEffect(() => {
    if (authCode) {
      const googleAuthCode = encodeURIComponent(authCode);

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      console.log(googleAuthCode);
      fetch(
        `${config.VACANCIES_AUTH_API_URL}/api/auth/google?providerAccessCode=${googleAuthCode}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
          }
          console.log(res);
        })
        .then(() => {
          const cookies = document.cookie.split("; ");
          const tokenCookie = cookies.find((row) =>
            row.startsWith("access_token=")
          );

          if (tokenCookie) {
            router.push("/vacancies");
          } else {
            console.error("No se encontró el token en las cookies.");
          }
        })
        .catch((err) => console.error("Error autenticando", err));
    }
  }, [authCode, router]);

  return <div>Autenticando con Google...</div>;
}
