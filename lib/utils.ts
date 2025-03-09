import { ApiResponse } from "@/types/dtos/ApiResponse";

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
): Promise<ApiResponse<T>> => {
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

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in API request (${method} ${endpoint}):`, error);
    return {
      success: false,
      message: "An error occurred during the API request.",
      data: undefined,
    };
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

//Emimina etiquetas html de textos
export const stripTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export enum EnumVacancyStatus {
  PendingReview = 0,
  Approved = 1,
  Rejected = 2,
  Published = 3,
  Expired = 4,
  Closed = 5,
}

export enum EnumVacancyTrigger {
  Approve = 0,
  Reject = 1,
  Publish = 2,
  Expire = 3,
  Close = 4,
  Reopen = 5,
  ReviewAgain = 6,
}

const statusLabels = {
  [EnumVacancyStatus.PendingReview]: "Pendiente revisión",
  [EnumVacancyStatus.Approved]: "Aprobada",
  [EnumVacancyStatus.Rejected]: "Rechazada",
  [EnumVacancyStatus.Published]: "Publicada",
  [EnumVacancyStatus.Expired]: "Expirada",
  [EnumVacancyStatus.Closed]: "Cerrada",
};

const triggerLabels = {
  [EnumVacancyTrigger.Approve]: "Aprobar",
  [EnumVacancyTrigger.Reject]: "Rechazar",
  [EnumVacancyTrigger.Publish]: "Publicar",
  [EnumVacancyTrigger.Expire]: "Expirar",
  [EnumVacancyTrigger.Close]: "Cerrar",
  [EnumVacancyTrigger.Reopen]: "Reabrir",
  [EnumVacancyTrigger.ReviewAgain]: "Enviar a revisión",
};

export const getVacancyStatus = (status: EnumVacancyStatus): string =>
  statusLabels[status] || "N/D";
export const getVacancyTrigger = (trigger: EnumVacancyTrigger): string =>
  triggerLabels[trigger] || "N/D";
