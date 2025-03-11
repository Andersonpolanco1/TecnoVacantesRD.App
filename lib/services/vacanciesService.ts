import { PaginatedResponse } from "@/types/PaginatedResponse";
import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";
import {
  apiRequestClient,
  apiRequestServer,
  convertFiltersToQueryParams,
  EnumVacancyTrigger,
} from "../utils";
import { VacancyChangeStatusResponse } from "@/types/dtos/vacancyChangeStatusresponse";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_API_BASE_URL}/api/vacancies`;

// Obtiene vacantes paginadas
export const fetchVacancies = async (filters: VacancyPublicFilter) => {
  const queryString = convertFiltersToQueryParams(filters);
  return await apiRequestClient<PaginatedResponse<VacancyPublicDto>>(
    `${API_URL}?${queryString}`
  );
};

// Obtiene vacantes del usuario autenticado
export const fetchUserVacancies = async (filters: VacancyPublicFilter) => {
  const queryString = convertFiltersToQueryParams(filters);
  return await apiRequestClient<PaginatedResponse<VacancyUserDto>>(
    `${API_URL}/mine?${queryString}`,
    "GET"
  );
};

// Obtiene una vacante publica por ID
export const fetchVacancyById = async (publicId: string) => {
  return await apiRequestClient<VacancyPublicDto>(`${API_URL}/${publicId}`);
};

// Obtiene una vacante de usuario por ID
export const fetchUserVacancyById = async (publicId: string, token: string) => {
  if (!token) {
    return { success: false, message: "Autenticación no disponible" };
  }
  return await apiRequestServer<VacancyUserDto>(
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

  const result = await apiRequestClient<{ guid: string }>(
    `${API_URL}/mine`,
    "POST",
    formData
  );

  return result;
};

export const ChangeState = async (
  trigger: EnumVacancyTrigger,
  publicId: string,
  reason?: string
) => {
  const result = await apiRequestClient<VacancyChangeStatusResponse>(
    `${API_URL}/mine/change-state`,
    "POST",
    { trigger, publicId, reason }
  );
  return result;
};
