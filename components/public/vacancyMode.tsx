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
    <div className="mb-3">
      <label htmlFor="vacancyMode" className="form-label">
        {flagRequired && <span className="text-danger">* </span>}Modalidad de
        Trabajo
      </label>
      <select
        id="vacancyMode"
        className="form-select"
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
