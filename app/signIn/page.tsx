"use client";

import { useState } from "react";
import AuthButtons from "@/components/public/AuthButtons";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);
    // Aquí puedes agregar la lógica de autenticación con tu API
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
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
        <AuthButtons />
      </div>
    </div>
  );
}
