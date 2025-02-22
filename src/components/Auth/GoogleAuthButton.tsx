"use client"; // Indica que este componente se renderiza en el cliente

import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const router = useRouter();

  const redirectToGoogleAuth = async () => {
    const response = await fetch(
      "https://localhost:7263/api/auth/redirecttogoogleauth"
    );

    if (response.ok) {
      const googleAuthUrl = await response.text();
      router.push(googleAuthUrl); // Redirige sin recargar la página
    } else {
      console.error("Error al redirigir a Google");
    }
  };

  return (
    <button onClick={redirectToGoogleAuth}>Iniciar sesión con Google</button>
  );
}
