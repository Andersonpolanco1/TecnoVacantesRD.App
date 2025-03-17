"use client";

import { VacancyUserFilter } from "@/types/VacancyFilters";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProvinceSelect from "./ProvinceSelect";
import VacancyModeSelect from "./vacancyMode";
import CategorySelect from "./CategorySelect";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";
import VacancyStatusSelect from "./StatusSelect";

const VacanciesUserFilter = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<VacancyUserFilter>({
    search: null,
    salaryFrom: null,
    salaryTo: null,
    provinceId: null,
    mode: null,
    categoryId: null,
    status: null,
    currentPage: 1,
  });

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  function handleFilterSubmit() {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        queryParams.set(key, String(value));
      }
    });
    router.push(`/vacancies/mine?${queryParams.toString()}`);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Buscar
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.search ?? ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Buscar en título y descripción"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="salaryFrom"
            className="block text-sm font-medium text-gray-700"
          >
            Salario desde
          </label>
          <input
            type="number"
            id="salaryFrom"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.salaryFrom ?? ""}
            onChange={(e) => handleFilterChange("salaryFrom", e.target.value)}
            placeholder="Salario mínimo"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="salaryTo"
            className="block text-sm font-medium text-gray-700"
          >
            Salario hasta
          </label>
          <input
            type="number"
            id="salaryTo"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.salaryTo ?? ""}
            onChange={(e) => handleFilterChange("salaryTo", e.target.value)}
            placeholder="Salario máximo"
            min="0"
          />
        </div>

        <ProvinceSelect
          flagRequired={false}
          onChange={(value) => handleFilterChange("provinceId", value)}
          value={filters.provinceId}
        />

        <VacancyModeSelect
          flagRequired={false}
          onChange={(value) => handleFilterChange("mode", value)}
          value={filters.mode}
        />

        <CategorySelect
          flagRequired={false}
          value={filters.categoryId}
          onChange={(value) => handleFilterChange("categoryId", value)}
        />

        <VacancyStatusSelect
          onChange={(value) => handleFilterChange("status", value)}
          value={filters.status}
        />

        {/* Botones con ancho completo */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex gap-4">
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 flex items-center justify-center gap-2"
            onClick={handleFilterSubmit}
          >
            <RiFilterFill className="text-lg" />
            Filtrar
          </button>

          <button
            type="button"
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 flex items-center justify-center gap-2"
            onClick={() => {
              setFilters({
                search: null,
                salaryFrom: null,
                salaryTo: null,
                provinceId: null,
                mode: null,
                categoryId: null,
                currentPage: 1,
              });
              router.push("/vacancies/mine");
            }}
          >
            <RiFilterOffFill className="text-lg" />
            Resetear Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacanciesUserFilter;
