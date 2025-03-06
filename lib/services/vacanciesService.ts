import { PaginatedResponse } from "@/types/PaginatedResponse";
import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";
import { apiRequest, convertFiltersToQueryParams } from "../utils";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_API_BASE_URL}/api/vacancies`;

// Obtiene vacantes paginadas
export const fetchVacancies = async (filters: VacancyPublicFilter) => {
  const queryString = convertFiltersToQueryParams(filters);
  return (
    (await apiRequest<PaginatedResponse<VacancyPublicDto>>(
      `${API_URL}?${queryString}`
    )) ?? PaginatedResponse.emptyObject<VacancyPublicDto>()
  );
};

// Obtiene vacantes del usuario autenticado
export const fetchUserVacancies = async (
  filters: VacancyPublicFilter,
  token: string
) => {
  const queryString = convertFiltersToQueryParams(filters);
  return (
    (await apiRequest<PaginatedResponse<VacancyUserDto>>(
      `${API_URL}/mine?${queryString}`,
      "GET",
      token
    )) ?? PaginatedResponse.emptyObject<VacancyUserDto>()
  );
};

// Obtiene una vacante publica por ID
export const fetchVacancyById = async (publicId: string) => {
  return await apiRequest<VacancyPublicDto>(`${API_URL}/${publicId}`);
};

// Obtiene una vacante de usuario por ID
export const fetchUserVacancyById = async (publicId: string, token: string) => {
  if (!token) {
    return { success: false, message: "Autenticación no disponible" };
  }
  return await apiRequest<VacancyUserDto>(
    `${API_URL}/mine/${publicId}`,
    "GET",
    token
  );
};

// Publica una nueva vacante
export const publish = async (formData: PublishVacancy, token: string) => {
  if (!token) {
    return { success: false, message: "Autenticación no disponible" };
  }

  const result = await apiRequest<{ success: boolean; message?: string }>(
    `${API_URL}/mine`,
    "POST",
    token,
    formData
  );

  return result ?? { success: false, message: "Error de conexión con la API" };
};
