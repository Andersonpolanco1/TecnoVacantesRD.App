"use client";

import React, { useEffect, useState } from "react";
import VacancyList from "@/components/Vacancy/VacancyList";
import VacancyMainFilter from "@/components/Vacancy/VacancyMainFilter";
import { fetchVacancies } from "@/lib/services/vacanciesService";
import { Vacancy } from "@/types/vacancy";
import { VacancyFilter } from "@/types/VacancyFilters";
import Pagination from "@/components/pagination";
import { useNotification } from "@/providers/notificationContext";
import { NOTIFICATION_COLORS } from "@/types/Notification";

export default function Page() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { showNotification } = useNotification();

  const [filters, setFilters] = useState<VacancyFilter>({
    description: null,
    salaryFrom: null,
    salaryTo: null,
    provinceId: null,
    mode: null,
    categoryId: null,
  });

  const loadVacancies = async () => {
    try {
      const data = await fetchVacancies(filters);
      if (data === null || !data.items || !Array.isArray(data.items)) {
        showNotification(
          NOTIFICATION_COLORS.danger,
          "Error de comunicación",
          "No se pudieron obtener las vacantes."
        );
      } else {
        setVacancies(data.items);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPagesCount);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleFilterChange = (newFilters: VacancyFilter) => {
    setFilters(newFilters);
  };

  const handleFilterClick = () => {
    setShouldFetch(true);
  };

  const handleFilterToggle = () => {
    setFilterExpanded(!filterExpanded);
  };

  const handlePageChange = (pageNumber: number) => {
    const updatedFilters = { ...filters, ["currentPage"]: pageNumber };
    setFilters(updatedFilters);
    setShouldFetch(true);
  };

  useEffect(() => {
    if (shouldFetch) {
      loadVacancies();
      setShouldFetch(false);
    }
  }, [shouldFetch, filters]);

  return (
    <>
      <div className="accordion mb-4" id="filterAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="filterHeading">
            <button
              className="accordion-button bg-light"
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
      <VacancyList vacancies={vacancies} />
      <div className="my-3">
        {totalPages != 0 && (
          <Pagination
            currentPage={currentPage}
            totalPagesCount={totalPages}
            onPageChange={(page) => handlePageChange(page)}
          />
        )}
      </div>
    </>
  );
}
