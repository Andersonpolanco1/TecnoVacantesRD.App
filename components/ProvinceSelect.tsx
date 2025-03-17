"use client";

import { useEffect, useState } from "react";
import { fetchProvinces } from "@/lib/services/provinceService";

interface Props {
  value?: number | null;
  onChange: (value: number | null) => void;
  flagRequired: boolean;
}

export default function ProvinceSelect({
  value,
  onChange,
  flagRequired,
}: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProvinces = async () => {
      const response = await fetchProvinces();
      if (response.success) setProvinces(response.data ?? []);
      setLoading(false);
    };
    loadProvinces();
  }, []);

  return (
    <div className="mb-4">
      <label
        htmlFor="provinceId"
        className="block text-sm font-medium text-gray-700"
      >
        {flagRequired && <span className="text-red-500">*</span>}Provincia /
        Municipio
      </label>
      <select
        name="provinceId"
        id="provinceId"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        disabled={loading}
      >
        <option value="">Seleccionar</option>
        {loading ? (
          <option value="" disabled>
            Cargando provincias...
          </option>
        ) : (
          provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))
        )}
      </select>
      {loading && <div className="mt-2 text-sm text-gray-500">Cargando...</div>}
    </div>
  );
}
