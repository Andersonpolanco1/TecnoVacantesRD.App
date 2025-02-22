import { VacancyFilter } from "@/types/VacancyFilters";
import config from "@/config/config_dev";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const fetchVacancies = async (filters: VacancyFilter) => {
  try {
    const queryString = convertFiltersToQueryParams(filters);
    const accessToken = localStorage.getItem("access_token");

    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const response = await fetch(
      `${config.VACANCIES_API_URL}/api/vacancies?${queryString}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching vacancies: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchVacancyById = async (publicId: string) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    `${config.VACANCIES_API_URL}/api/vacancies/${publicId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }
  );
  if (!response.ok) return null;
  return response.json();
};

const convertFiltersToQueryParams = (filters: VacancyFilter): string => {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  }
  return queryParams.toString();
};
