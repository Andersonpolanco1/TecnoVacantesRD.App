"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegFileAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import Navigation from "./Navigation ";

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <nav className="p-4 text-center">Cargando...</nav>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" href="/vacancies">
          TecnoVacantesRD
        </Link>
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
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            <Navigation />

            {session ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={session.user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                  <span>{session.user?.name}</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link className="dropdown-item" href="/profile">
                      <FaUser className="me-2" /> Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/vacancies/mine">
                      <FaRegFileAlt className="me-2" /> Mis vacantes
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="dropdown-item text-danger"
                    >
                      <FaSignOutAlt className="me-2" /> Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-outline-light px-3"
                  href="/signIn"
                >
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
