import { VacancyPublicFilter } from "@/types/VacancyFilters";
import React, { useState } from "react";
import CategorySelect from "../category/CategorySelect";
import VacancyModeSelect from "../Mode/vacancyMode";
import ProvinceSelect from "../province/ProvinceSelect";

interface FiltroVacantesProps {
  onFilterChange: (filters: VacancyPublicFilter) => void;
  onFilterClick: () => void;
}

const VacancyMainFilter = ({
  onFilterChange,
  onFilterClick,
}: FiltroVacantesProps) => {
  const [filters, setFilters] = useState<VacancyPublicFilter>({
    description: null,
    salaryFrom: null,
    salaryTo: null,
    provinceId: null,
    mode: null,
    categoryId: null,
  });

  const handleFilterChange = (field: string, value: any) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  function handleFilterSubmit() {
    onFilterClick();
  }

  return (
    <div>
      <div className="row">
        {/* Filtro por Descripción */}
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

        {/* Filtro por Salario Desde */}
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

        {/* Filtro por Salario Hasta */}
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
        {/* Filtro por Ubicación */}
        <div className="col-md-4 mb-3">
          <ProvinceSelect
            flagRequired={false}
            onChange={(value) => handleFilterChange("provinceId", value)}
            value={filters.provinceId}
          />
        </div>

        {/* Filtro por Modo y Categoría en la misma fila */}
        <div className="col-md-4 mb-3">
          <VacancyModeSelect
            flagRequired={false}
            onChange={(value) => handleFilterChange("mode", value)}
            value={filters.mode}
          />
        </div>

        <div className="col-md-4 mb-3">
          {/* Filtro por Modo y Categoría en la misma fila */}
          <CategorySelect
            flagRequired={false}
            value={filters.categoryId}
            onChange={(value) => handleFilterChange("categoryId", value)}
          />
        </div>
      </div>

      <div className="row">
        {/* Botón de Filtrar */}
        <div className="col-12 col-md-6 d-grid text-center mt-4">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => {
              handleFilterSubmit();
            }}
          >
            Filtrar
          </button>
        </div>

        {/* Botón de Resetear Filtros */}
        <div className="col-12 col-md-6 d-grid text-center mt-4">
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => {
              const resetFilters = {
                description: null,
                salaryFrom: null,
                salaryTo: null,
                location: null,
                mode: null,
                categoryId: null,
              };
              setFilters(resetFilters);
              onFilterChange(resetFilters);
            }}
          >
            Resetear Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacancyMainFilter;
