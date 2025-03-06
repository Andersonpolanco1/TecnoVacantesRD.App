import { PaginatedResponse } from "@/types/PaginatedResponse";
import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";

const fetchPaginated = async <T>(
  url: string,
  filters: VacancyPublicFilter,
  token: string
): Promise<PaginatedResponse<T> | null> => {
  try {
    const queryString = convertFiltersToQueryParams(filters);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${url}?${queryString}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching vacancies: ${response.statusText}`);
    }

    const data: PaginatedResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchPaginated:", error);
    return PaginatedResponse.emptyObject<T>();
  }
};

export const fetchVacancies = async (filters: VacancyPublicFilter) => {
  var data = await fetchPaginated<VacancyPublicDto>(
    `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/vacancies`,
    filters,
    ""
  );

  if (!data) data = PaginatedResponse.emptyObject<VacancyPublicDto>();
  return data;
};

export const fetchUserVacancies = async (
  filters: VacancyPublicFilter,
  token: string
) => {
  var data = await fetchPaginated<VacancyUserDto>(
    `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/vacancies/mine`,
    filters,
    token
  );
  if (!data) data = PaginatedResponse.emptyObject<VacancyUserDto>();
  return data;
};

export const fetchVacancyById = async (publicId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/vacancies/${publicId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) return null;
  return response.json();
};

export const publish = async (formData: PublishVacancy, token: string) => {
  if (!token) {
    return {
      success: false,
      message: "Autenticación no disponible",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/vacancies/mine`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Error al registrar la vacante",
      };
    }
  } catch (error) {
    return { success: false, message: "Error de conexión con la API" };
  }
};

const convertFiltersToQueryParams = (filters: VacancyPublicFilter): string => {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  }
  return queryParams.toString();
};
