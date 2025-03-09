import { useEffect, useState } from "react";
import { fetchProvinces } from "@/lib/services/provinceService";

interface Props {
  value?: number | null;
  onChange: (value: number | null) => void;
  flagRequired: boolean;
}

export default function CategorySelect({
  value,
  onChange,
  flagRequired,
}: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetchProvinces();
      if (response.success) setProvinces(response.data ?? []);
      setLoading(false);
    };
    loadCategories();
  }, []);

  return (
    <>
      <label htmlFor="provinceId" className="form-label">
        {flagRequired && <span className="text-danger">* </span>}Provincia /
        Municipio
      </label>
      <select
        name="provinceId"
        id="provinceId"
        className="form-select"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        disabled={loading}
      >
        <option value="">Seleccionar</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
    </>
  );
}
