"use client";

import { fetchUserVacancies } from "@/lib/services/vacanciesService";
import { useNotification } from "@/providers/notificationContext";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { Vacancy } from "@/types/vacancy";
import { VacancyFilter } from "@/types/VacancyFilters";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const MisVacantes = () => {
  const [vacantes, setVacantes] = useState<Vacancy[]>([]);
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [filters, setFilters] = useState<VacancyFilter>({
    description: null,
    salaryFrom: null,
    salaryTo: null,
    provinceId: null,
    mode: null,
    categoryId: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) {
        showNotification(NOTIFICATION_COLORS.danger, "Sesión inválida", "");
        return;
      }

      try {
        const data = await fetchUserVacancies(filters, session.accessToken);
        setVacantes(data.items);
      } catch (error) {
        console.error("Error obteniendo vacantes:", error);
        showNotification(
          NOTIFICATION_COLORS.danger,
          "Error al obtener vacantes",
          ""
        );
      }
    };

    fetchData();
  }, [session?.accessToken, filters]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Mis Vacantes</h1>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Salario</th>
            <th>Fecha de Cierre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vacantes.map((vacante) => (
            <tr key={vacante.publicId}>
              <td>{vacante.title}</td>
              <td>{vacante.vacancyDescription.substring(0, 100)}...</td>
              <td>{vacante.salary}</td>
              <td>{vacante.closeDate}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editVacante(vacante.publicId)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteVacante(vacante.publicId)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const editVacante = (id: string) => {
  // Redirigir a la página de edición
  window.location.href = `/editar-vacante/${id}`;
};

const deleteVacante = (id: string) => {
  // Eliminar la vacante
  fetch(`/api/vacantes/${id}`, { method: "DELETE" }).then(() =>
    alert("Vacante eliminada")
  );
};

export default MisVacantes;
