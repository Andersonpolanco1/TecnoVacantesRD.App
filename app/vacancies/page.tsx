"use client";

import React, { useState } from "react";
import VacancyList from "@/components/Vacancy/VacancyList";
import VacancyMainFilter from "@/components/Vacancy/VacancyMainFilter";
import { fetchVacancies } from "@/lib/services/vacanciesService";
import { Vacancy } from "@/types/vacancy";
import { VacancyFilter } from "@/types/VacancyFilters";
import Pagination from "@/components/controls/pagination";
import { useSession } from "next-auth/react";

export default function Page() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data: session } = useSession();

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
      const data = await fetchVacancies(filters, session);
      if (data === null || !data.items || !Array.isArray(data.items)) {
        throw new Error("No se pudo obtener las vacantes");
      }
      setVacancies(data.items);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPagesCount);
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

  const handlePageChange = (pageNumber: number) => {
    const updatedFilters = { ...filters, ["currentPage"]: pageNumber };
    setFilters(updatedFilters);
    setShouldFetch(true);
  };

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
      <div
        className="vacancy-container border border-1"
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        <VacancyList vacancies={vacancies} />
      </div>
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
