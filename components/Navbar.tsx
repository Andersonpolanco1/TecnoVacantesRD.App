"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Navigation from "./Navigation ";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { data: session, status } = useSession();

  // Si la sesión está cargando
  if (status === "loading") {
    return <nav>Loading...</nav>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/vacancies">
          TecnoVacantesRD
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <Navigation />

            {/* Mostrar información del usuario si la sesión está activa */}
            {session ? (
              <>
                <Link className="nav-link" href="/vacancies/me">
                  Mis vacantes
                </Link>
                <li className="nav-item">
                  <span className="nav-link">Hola, {session.user?.name}</span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                {/* Redirigir al formulario de inicio de sesión */}
                <Link className="nav-link" href="/signIn">
                  Iniciar sesión
                </Link>
              </li>
            )}

            {/* Botón de cerrar sesión si la sesión está activa */}
            {session && (
              <li className="nav-item">
                <button onClick={() => signOut()} className="btn btn-danger">
                  <FaSignOutAlt className="me-2" /> Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
