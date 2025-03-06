import { apiRequest } from "../utils";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_API_BASE_URL}/api/categories`;

// Obtiene provincias
export const fetchCategories = async () => {
  return (await apiRequest<Province[]>(`${API_URL}`)) ?? [];
};
