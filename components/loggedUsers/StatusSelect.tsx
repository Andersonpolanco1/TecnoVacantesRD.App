"use client";

import { EnumVacancyStatus, getVacancyStatus } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface StatusSelectProps {
  value?: number | null;
  onChange: (status?: number | "") => void;
}

const VacancyStatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<number | "">("");

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setSelectedStatus(value);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue =
      event.target.value === "" ? "" : Number(event.target.value);
    setSelectedStatus(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label className="form-label" htmlFor="vacancy-status">
        Estado de la vacante:
      </label>
      <select
        id="vacancy-status"
        value={selectedStatus}
        onChange={handleChange}
        className="form-select"
      >
        <option value={""}>Seleccionar</option>
        {Object.values(EnumVacancyStatus)
          .filter((status) => typeof status === "number")
          .map((status) => (
            <option key={status} value={status}>
              {getVacancyStatus(status as EnumVacancyStatus)}
            </option>
          ))}
      </select>
    </div>
  );
};

export default VacancyStatusSelect;
