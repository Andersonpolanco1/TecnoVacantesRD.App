"use client";

import { useState } from "react";
import AuthButtons from "@/components/AuthButtons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { RiMailFill } from "react-icons/ri";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);
    const res = await signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-6 rounded-2xl shadow-lg w-100 bg-white">
        <p className="text-3xl font-bold text-center text-gray-800">
          TecnoVacantesRD
        </p>
        <h4 className="text-center mb-4 text-xl font-semibold text-gray-600">
          Iniciar Sesión
        </h4>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="correo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
          >
            <RiMailFill className="w-5 h-5 text-white" />
            Iniciar Sesión
          </button>
        </form>

        <div className="my-2 text-center">
          <Link
            href="#"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Regístrate
          </Link>
        </div>

        {/* Separador */}
        <div className="text-center my-4 text-gray-600">o</div>

        {/* Botones de OAuth */}
        <AuthButtons />
      </div>
    </div>
  );
}
