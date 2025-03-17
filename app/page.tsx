"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center text-center px-4 mt-12">
      <h1 className="text-4xl font-extrabold text-primary">TecnoVacantesRD</h1>
      <p className="mt-2 text-lg text-gray-600">
        Encuentra tu próxima oportunidad en tecnología en República Dominicana.
      </p>

      <div className="mt-4">
        <img
          src="/job-search.png"
          alt="Búsqueda de empleo"
          className="max-h-24 mx-auto"
        />
      </div>

      <div className="mt-5">
        <Link
          href="/vacancies"
          className="inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Explorar Vacantes
        </Link>
      </div>
    </div>
  );
}
