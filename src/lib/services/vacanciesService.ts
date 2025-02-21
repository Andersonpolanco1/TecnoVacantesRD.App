import { VacancyFilter } from "@/types/VacancyFilters";

export const fetchVacancies = async (filters: VacancyFilter) => {
  const BASE_URL = `https://localhost:7290`; //`${process.env.VACANCIES_API_URL}/api/vacancies`
  try {
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const queryString = convertFiltersToQueryParams(filters);
    console.log(`${BASE_URL}/api/vacancies?${queryString}`);
    const response = await fetch(`${BASE_URL}/api/vacancies?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error fetching vacancies: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchVacancyById = async (publicId: string) => {
  ///process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const response = await fetch(
    `${process.env.VACANCIES_API_URL}/api/vacancies/${publicId}`
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
