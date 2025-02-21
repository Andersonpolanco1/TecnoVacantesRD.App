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
      var googleAuthCode = `${encodeURIComponent(authCode)}`;
      fetch(
        `${config.VACANCIES_AUTH_API_URL}/api/auth/google?code=${googleAuthCode}`,
        { method: "GET" }
      )
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
          }
          // Verifica si hay contenido antes de intentar parsear como JSON
          const text = await res.text();
          return text ? JSON.parse(text) : {};
        })
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            router.push("/vacancies"); // Redirige al usuario
          } else {
            console.error("No se recibió un token de acceso válido.");
          }
        })
        .catch((err) => console.error("Error autenticando"));
    }
  }, [authCode, router]);

  return <div>Autenticando con Google...</div>;
}
