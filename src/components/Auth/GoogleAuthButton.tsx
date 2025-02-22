"use client";

import { useRouter } from "next/navigation";
import config from "@/config/config_dev";
import Image from "next/image";

export default function GoogleAuthButton() {
  const router = useRouter();

  const redirectToGoogleAuth = async () => {
    const response = await fetch(
      `${config.VACANCIES_AUTH_API_URL}/api/auth/redirecttogoogleauth`
    );

    if (response.ok) {
      const googleAuthUrl = await response.text();
      router.push(googleAuthUrl);
    } else {
      console.error("Error al redirigir a Google");
    }
  };

  return (
    <button
      onClick={redirectToGoogleAuth}
      className="btn btn-outline-danger w-100 mb-2 d-flex align-items-center justify-content-center"
    >
      <Image src="/google-logo.png" alt="Google" width={20} height={20} />
      <span className="ms-2">Iniciar con Google</span>
    </button>
  );
}
