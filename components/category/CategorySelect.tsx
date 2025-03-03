import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/services/categoryService";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };
    loadCategories();
  }, []);

  return (
    <>
      <label htmlFor="category" className="form-label">
        {flagRequired && <span className="text-danger">* </span>}Categoría
      </label>
      <select
        id="category"
        className="form-select"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        disabled={loading}
      >
        <option value="">Seleccionar</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}
