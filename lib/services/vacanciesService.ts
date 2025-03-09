import { PaginatedResponse } from "@/types/PaginatedResponse";
import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";
import {
  apiRequest,
  convertFiltersToQueryParams,
  EnumVacancyTrigger,
} from "../utils";
import { VacancyChangeStatusResponse } from "@/types/dtos/vacancyChangeStatusresponse";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_API_BASE_URL}/api/vacancies`;

// Obtiene vacantes paginadas
export const fetchVacancies = async (filters: VacancyPublicFilter) => {
  const queryString = convertFiltersToQueryParams(filters);
  return await apiRequest<PaginatedResponse<VacancyPublicDto>>(
    `${API_URL}?${queryString}`
  );
};

// Obtiene vacantes del usuario autenticado
export const fetchUserVacancies = async (
  filters: VacancyPublicFilter,
  token: string
) => {
  const queryString = convertFiltersToQueryParams(filters);
  return await apiRequest<PaginatedResponse<VacancyUserDto>>(
    `${API_URL}/mine?${queryString}`,
    "GET",
    token
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

  const result = await apiRequest<{ guid: string }>(
    `${API_URL}/mine`,
    "POST",
    token,
    formData
  );

  return result;
};

export const ChangeState = async (
  trigger: EnumVacancyTrigger,
  publicId: string,
  token: string,
  reason?: string
) => {
  const result = await apiRequest<VacancyChangeStatusResponse>(
    `${API_URL}/mine/change-state`,
    "POST",
    token,
    { trigger, publicId, reason }
  );
  return result;
};
