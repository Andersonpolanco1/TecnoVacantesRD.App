"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  // Obtén la sesión actual
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
            <li className="nav-item">
              <a className="nav-link active" href="/vacancies">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Sobre Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/post-job">
                Publicar Vacante
              </a>
            </li>

            {/* Mostrar información del usuario si la sesión está activa */}
            {session ? (
              <li className="nav-item">
                <span className="nav-link">Hola, {session.user?.name}</span>
              </li>
            ) : (
              <li className="nav-item">
                <button onClick={() => signIn()} className="btn btn-primary">
                  Iniciar sesión
                </button>
              </li>
            )}

            {/* Botón de cerrar sesión si la sesión está activa */}
            {session && (
              <li className="nav-item">
                <button onClick={() => signOut()} className="btn btn-danger">
                  Cerrar sesión
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
