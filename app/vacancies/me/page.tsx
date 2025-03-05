"use client";

import React, { useEffect, useState } from "react";
import VacancyMainFilter from "@/components/Vacancy/VacancyMainFilter";
import { fetchUserVacancies } from "@/lib/services/vacanciesService";
import { VacancyUserDto } from "@/types/vacancy";
import { VacancyUserFilter } from "@/types/VacancyFilters";
import Pagination from "@/components/pagination";
import { useNotification } from "@/providers/notificationContext";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import VacancyUserListItem from "@/components/Vacancy/VacancyUserListItem";
import { useSession } from "next-auth/react";

export default function Page() {
  const [vacancies, setVacancies] = useState<VacancyUserDto[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { showNotification } = useNotification();
  const { data: session } = useSession();

  const [filters, setFilters] = useState<VacancyUserFilter>({
    description: null,
    salaryFrom: null,
    salaryTo: null,
    provinceId: null,
    mode: null,
    categoryId: null,
  });

  const fetchData = async () => {
    if (!session?.accessToken) {
      showNotification(NOTIFICATION_COLORS.danger, "Sesión inválida", "");
      return;
    }

    try {
      const data = await fetchUserVacancies(filters, session.accessToken);
      setVacancies(data.items);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPagesCount);
    } catch (error) {
      console.error("Error obteniendo vacantes:", error);
      showNotification(
        NOTIFICATION_COLORS.danger,
        "Error al obtener vacantes",
        ""
      );
    }
  };

  const handleFilterChange = (newFilters: VacancyUserFilter) => {
    setFilters(newFilters);
  };

  const handleFilterClick = () => {
    setShouldFetch(true);
  };

  const handleFilterToggle = () => {
    setFilterExpanded(!filterExpanded);
  };

  const handlePageChange = (pageNumber: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, currentPage: pageNumber }));
    setShouldFetch(true);
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setShouldFetch(false);
    }
  }, [shouldFetch, filters]);

  return (
    <>
      <div className="accordion mb-4" id="filterAccordion">
        <div className="accordion-item shadow-sm">
          <h2 className="accordion-header" id="filterHeading">
            <button
              className="accordion-button text-dark bg-light border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filterCollapse"
              aria-expanded={filterExpanded ? "true" : "false"}
              aria-controls="filterCollapse"
              onClick={handleFilterToggle}
            >
              Filtrar vacantes
            </button>
          </h2>
          <div
            id="filterCollapse"
            className={`accordion-collapse collapse ${
              filterExpanded ? "show" : ""
            }`}
            aria-labelledby="filterHeading"
            data-bs-parent="#filterAccordion"
          >
            <div className="accordion-body">
              <VacancyMainFilter
                onFilterChange={handleFilterChange}
                onFilterClick={handleFilterClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <div key={vacancy.publicId}>
              <VacancyUserListItem vacancy={vacancy} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center" role="alert">
              No has publicado ninguna vacante.
            </div>
          </div>
        )}
      </div>

      <div className="my-3">
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPagesCount={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
