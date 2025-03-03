import { useEffect, useState } from "react";
import { fetchProvinces } from "@/lib/services/provinceService";

interface Props {
  value?: number | null;
  onChange: (value: number | null) => void;
}

export default function CategorySelect({ value, onChange }: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchProvinces();
      setProvinces(data);
      setLoading(false);
    };
    loadCategories();
  }, []);

  return (
    <>
      <label htmlFor="province" className="form-label">
        Provincia / Municipio
      </label>
      <select
        id="province"
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
