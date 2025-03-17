import { apiRequestClient } from "../apputils";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_API_BASE_URL}/api/categories`;

// Obtiene provincias
export const fetchCategories = async () => {
  var data = (await apiRequestClient<Category[]>(`${API_URL}`)) ?? [];
  return data;
};
