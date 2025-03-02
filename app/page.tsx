"use client";

import { useNotification } from "@/providers/notificationContext";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { useEffect } from "react";

export default function WelcomePage() {
  const { showNotification } = useNotification();

  useEffect(() => {
    showNotification(
      NOTIFICATION_COLORS.success,
      "Bienvenido",
      "¡Bienvenido a TecnoVacantesRD!"
    );
  }, []);

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
        <a href="/vacancies" className="btn btn-primary btn-lg">
          Explorar Vacantes
        </a>
        <a href="auth/login" className="btn btn-outline-primary btn-lg ms-3">
          Registrarse
        </a>
      </div>
    </div>
  );
}
