import { apiRequest } from "../utils";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_API_BASE_URL}/api/provinces`;

// Obtiene provincias
export const fetchProvinces = async () => {
  return (await apiRequest<Province[]>(`${API_URL}`)) ?? [];
};
