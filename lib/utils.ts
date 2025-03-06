export const EnumVacancyStatusMap: Record<number, string> = {
  0: "Pendiente revisión",
  1: "Aprobada",
  2: "Rechazada",
  3: "Publicada",
  4: "Expirada",
  5: "Cerrada",
};

export const getVacancyStatus = (status: number): string => {
  console.log(status);
  return EnumVacancyStatusMap[status] || "N/D";
};

export const getShortDescription = (
  vacancyDescription: string,
  maxLenght: number = 100
): string => {
  return vacancyDescription.length > maxLenght
    ? `${vacancyDescription.substring(0, maxLenght)}...`
    : vacancyDescription;
};

export const formatDate = (date: string) => {
  if (!date) return "N/D";
  return new Date(date).toLocaleDateString();
};

export const formatLocation = (provinceName?: string) => {
  if (!provinceName) return "N/D";
  return provinceName;
};

//funcion generica para peticiones http
export const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  token: string = "",
  body?: any
): Promise<T | null> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(endpoint, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in API request (${method} ${endpoint}):`, error);
    return null;
  }
};

//convierte filtros en query string
export const convertFiltersToQueryParams = (
  filters: Record<string, any>
): string => {
  return new URLSearchParams(
    Object.entries(filters)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(([key, value]) => [key, String(value)])
  ).toString();
};
