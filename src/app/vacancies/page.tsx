"use client";

import React, { useState, useEffect } from "react";
import VacancyList from "@/components/Vacancy/VacancyList";
import VacancyMainFilter from "@/components/Vacancy/VacancyMainFilter";
import { fetchVacancies } from "@/lib/services/vacanciesService";
import { Vacancy } from "@/types/vacancy";
import { VacancyFilter } from "@/types/VacancyFilters";

export default function Page() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [filters, setFilters] = useState<VacancyFilter>({
    description: null,
    salaryFrom: null,
    salaryTo: null,
    location: null,
    mode: null,
    categoryId: null,
  });

  const loadVacancies = async () => {
    try {
      const data = await fetchVacancies(filters);
      if (data === null || !data.items || !Array.isArray(data.items)) {
        throw new Error("No se pudo obtener las vacantes");
      }
      setVacancies(data.items);
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

  if (shouldFetch) {
    loadVacancies();
    setShouldFetch(false);
  }

  const handleFilterToggle = () => {
    setFilterExpanded(!filterExpanded);
  };

  return (
    <>
      <div
        className="accordion mb-5 sticky-filter sticky-top"
        id="filterAccordion"
      >
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
    </>
  );
}
