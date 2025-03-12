"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { VacancyPublicDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";
import Pagination from "@/components/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Importa usePathname y useSearchParams
import VacancyListItem from "@/components/VacancyListItem";
import VacancyMainFilter from "@/components/VacancyMainFilter";
import { VacancyMode } from "@/types/VacancyMode";

interface VacanciesClientProps {
  initialVacancies: VacancyPublicDto[];
  initialFilters: VacancyPublicFilter;
  initialPage: number;
  totalPages: number;
}

export default function VacanciesPublicListClient({
  initialVacancies,
  initialFilters,
  initialPage,
  totalPages,
}: VacanciesClientProps) {
  const [vacancies, setVacancies] =
    useState<VacancyPublicDto[]>(initialVacancies);
  const [filters, setFilters] = useState<VacancyPublicFilter>(initialFilters);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname(); // Obtiene la ruta actual
  const searchParams = useSearchParams(); // Obtiene los parámetros de búsqueda

  // Espera los parámetros de búsqueda en useEffect
  useEffect(() => {
    const fetchSearchParams = async () => {
      const params = await searchParams;

      setFilters((prevFilters) => ({
        ...prevFilters,
        description: params.get("description") || null,
        salaryFrom: params.get("salaryFrom")
          ? Number(params.get("salaryFrom"))
          : null,
        salaryTo: params.get("salaryTo")
          ? Number(params.get("salaryTo"))
          : null,
        provinceId: params.get("provinceId")
          ? Number(params.get("provinceId"))
          : null,
        mode: params.get("mode")
          ? (Number(params.get("mode")) as VacancyMode)
          : null,
        categoryId: params.get("categoryId")
          ? Number(params.get("categoryId"))
          : null,
      }));
    };

    fetchSearchParams();
  }, [searchParams]);

  const memoizedVacancies = useMemo(() => vacancies, [vacancies]);
  const memoizedFilters = useMemo(() => filters, [filters]);

  // Actualizar filtros y vacantes cuando cambie la URL
  useEffect(() => {
    setVacancies(initialVacancies);
    setFilters(initialFilters);
    setCurrentPage(initialPage);
    setLoading(false);
  }, [initialVacancies, initialFilters, initialPage]);

  // Actualización de URL con filtros
  const updateURL = useCallback(
    (updatedFilters: VacancyPublicFilter) => {
      const params = new URLSearchParams();

      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value != null && value !== "") {
          params.set(key, String(value)); // Usar `set` para evitar duplicados
        }
      });

      // Solo actualiza la URL si algo cambió
      if (params.toString() !== searchParams.toString()) {
        router.push(`${pathname}?${params.toString()}`);
      }
    },
    [router, pathname, searchParams]
  );

  const handleFilterChange = (newFilters: VacancyPublicFilter) => {
    setFilters(newFilters);
  };

  const handleFilterClick = () => {
    updateURL({ ...filters, currentPage: 1 });
  };

  const handlePageChange = (pageNumber: number) => {
    updateURL({ ...filters, currentPage: pageNumber });
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="accordion mb-4" id="filterAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="filterHeading">
                <button
                  className="accordion-button bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#filterCollapse"
                  aria-expanded={true}
                  aria-controls="filterCollapse"
                >
                  Filtrar vacantes
                </button>
              </h2>
              <div
                id="filterCollapse"
                className="accordion-collapse collapse show"
                aria-labelledby="filterHeading"
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
            {memoizedVacancies.length ? (
              memoizedVacancies.map((vacancy) => (
                <div key={vacancy.publicId}>
                  <VacancyListItem vacancy={vacancy} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div>Sin resultados.</div>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="my-3">
              <Pagination
                currentPage={currentPage}
                totalPagesCount={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
