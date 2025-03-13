"use client";

import { VacancyPublicFilter } from "@/types/VacancyFilters";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProvinceSelect from "./ProvinceSelect";
import VacancyModeSelect from "./vacancyMode";
import CategorySelect from "./CategorySelect";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";

const VacanciesPublicFilter = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<VacancyPublicFilter>({
    description: null,
    salaryFrom: null,
    salaryTo: null,
    provinceId: null,
    mode: null,
    categoryId: null,
    page: 1,
  });

  const handleFilterChange = (field: string, value: any) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
  };

  function handleFilterSubmit() {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        queryParams.set(key, String(value));
      }
    });

    router.push(`/vacancies?${queryParams.toString()}`); // Redirige con los nuevos filtros
  }

  return (
    <div className="bg-light my-3 p-2">
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={filters.description ?? ""}
            onChange={(e) => handleFilterChange("description", e.target.value)}
            placeholder="Descripción de la vacante"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="salaryFrom" className="form-label">
            Salario desde
          </label>
          <input
            type="number"
            id="salaryFrom"
            className="form-control"
            value={filters.salaryFrom ?? ""}
            onChange={(e) => handleFilterChange("salaryFrom", e.target.value)}
            placeholder="Salario mínimo"
            min="0"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="salaryTo" className="form-label">
            Salario hasta
          </label>
          <input
            type="number"
            id="salaryTo"
            className="form-control"
            value={filters.salaryTo ?? ""}
            onChange={(e) => handleFilterChange("salaryTo", e.target.value)}
            placeholder="Salario máximo"
            min="0"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <ProvinceSelect
            flagRequired={false}
            onChange={(value) => handleFilterChange("provinceId", value)}
            value={filters.provinceId}
          />
        </div>

        <div className="col-md-4 mb-3">
          <VacancyModeSelect
            flagRequired={false}
            onChange={(value) => handleFilterChange("mode", value)}
            value={filters.mode}
          />
        </div>

        <div className="col-md-4 mb-3">
          <CategorySelect
            flagRequired={false}
            value={filters.categoryId}
            onChange={(value) => handleFilterChange("categoryId", value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 d-grid text-center mt-4">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleFilterSubmit}
          >
            <RiFilterFill className="me-2" />
            Filtrar
          </button>
        </div>

        <div className="col-12 col-md-6 d-grid text-center mt-4">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setFilters({
                description: null,
                salaryFrom: null,
                salaryTo: null,
                provinceId: null,
                mode: null,
                categoryId: null,
                page: 1,
              });
              router.push("/vacancies");
            }}
          >
            <RiFilterOffFill className="me-2" />
            Resetear Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacanciesPublicFilter;
