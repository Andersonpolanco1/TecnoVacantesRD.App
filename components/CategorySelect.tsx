"use client";

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
      const response = await fetchCategories();
      if (response.success) {
        setCategories(response.data ?? []);
      }
      setLoading(false);
    };
    loadCategories();
  }, []);

  return (
    <div>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
      >
        Categoría{flagRequired && <span className="text-red-500">*</span>}
      </label>
      <select
        id="category"
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
            Cargando categorías...
          </option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
