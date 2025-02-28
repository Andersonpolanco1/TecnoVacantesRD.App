import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/services/categoryService";

interface Props {
  value?: number | null;
  onChange: (value: number | null) => void;
}

export default function CategorySelect({ value, onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <>
      <label htmlFor="category" className="form-label">
        Categoría
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
