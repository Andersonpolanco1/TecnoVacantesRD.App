"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton";

export default function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);
    // Aquí puedes agregar la lógica de autenticación con tu API
  };

  const redirectToOAuth = (provider: string) => {
    router.push(`/api/auth/${provider}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "22rem" }}>
        <p className="fs-3 text-center fw-bold">TecnoVacantesRD</p>
        <h4 className="text-center mb-4">Iniciar Sesión</h4>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="correo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>

        {/* Separador */}
        <div className="text-center my-3">o</div>

        {/* Botones de OAuth */}
        <GoogleAuthButton />

        <button
          className="btn btn-outline-primary w-100 mb-2 d-flex align-items-center justify-content-center"
          onClick={() => redirectToOAuth("linkedin")}
        >
          <Image
            src="/linkedin-logo.png"
            alt="LinkedIn"
            width={20}
            height={20}
          />
          <span className="ms-2">Iniciar con LinkedIn</span>
        </button>

        <button
          className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center"
          onClick={() => redirectToOAuth("github")}
        >
          <Image src="/github-logo.png" alt="GitHub" width={20} height={20} />
          <span className="ms-2">Iniciar con GitHub</span>
        </button>
      </div>
    </div>
  );
}
