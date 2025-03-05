import { VacancyPublicFilter } from "@/types/VacancyFilters";

const fetchPaginated = async (
  url: string,
  filters: VacancyPublicFilter,
  token: string
) => {
  try {
    const queryString = convertFiltersToQueryParams(filters);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${url}?${queryString}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching vacancies: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchVacancies = async (filters: VacancyPublicFilter) => {
  return await fetchPaginated(
    `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/vacancies`,
    filters,
    ""
  );
};

export const fetchUserVacancies = async (
  filters: VacancyPublicFilter,
  token: string
) => {
  return await fetchPaginated(
    `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/usersvacancies`,
    filters,
    token
  );
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
      `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/usersvacancies`,
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
