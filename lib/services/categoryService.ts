import { apiRequestClient } from "../utils";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_API_BASE_URL}/api/categories`;

// Obtiene provincias
export const fetchCategories = async () => {
  return (await apiRequestClient<Category[]>(`${API_URL}`)) ?? [];
};
