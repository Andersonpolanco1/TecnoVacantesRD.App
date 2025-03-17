import React from "react";
import { VacancyMode, VacancyModeLabels } from "@/types/VacancyMode";

interface VacancyModeSelectProps {
  value?: VacancyMode | null;
  onChange: (mode: VacancyMode) => void;
  flagRequired: boolean;
}

const VacancyModeSelect: React.FC<VacancyModeSelectProps> = ({
  value,
  onChange,
  flagRequired,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="vacancyMode"
        className="block text-sm font-medium text-gray-700"
      >
        {flagRequired && <span className="text-red-500">*</span>}Modalidad de
        Trabajo
      </label>
      <select
        id="vacancyMode"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value) as VacancyMode)}
      >
        <option value="">Seleccionar</option>
        {Object.values(VacancyMode)
          .filter((v) => !isNaN(Number(v)))
          .map((mode) => (
            <option key={mode} value={mode}>
              {VacancyModeLabels[mode as VacancyMode]}
            </option>
          ))}
      </select>
    </div>
  );
};

export default VacancyModeSelect;
