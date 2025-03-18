import { ApiResponse } from "@/types/dtos/ApiResponse";

const API_URL = `${process.env.NEXT_PUBLIC_VACANCIES_AUTH_API_URL}`;

export const register = async (
  formData: FormData
): Promise<ApiResponse<number>> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => null);
      return ApiResponse.ErrorResponse(
        errorResponse?.message ||
          `Request failed with status ${response.status}`
      );
    }

    const data: ApiResponse<number> = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return ApiResponse.ErrorResponse("Error inesperado en la solicitud.");
  }
};
