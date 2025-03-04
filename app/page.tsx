"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold text-primary">TecnoVacantesRD</h1>
      <p className="lead text-secondary">
        Encuentra tu próxima oportunidad en tecnología en República Dominicana.
      </p>

      <div className="mt-4">
        <img
          src="/job-search.png"
          alt="Búsqueda de empleo"
          className="img-fluid"
          style={{ maxHeight: "100px" }}
        />
      </div>

      <div className="mt-5">
        <Link href="/vacancies" className="btn btn-primary btn-lg">
          Explorar Vacantes
        </Link>
        <Link href="/signIn" className="btn btn-outline-primary btn-lg ms-3">
          Registrarse
        </Link>
      </div>
    </div>
  );
}
