export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const ApiResponse = {
  SuccessResponse: <T>(
    data: T,
    message: string = "Success"
  ): ApiResponse<T> => ({
    success: true,
    message,
    data,
  }),
  ErrorResponse: <T>(
    message: string = "An error occurred"
  ): ApiResponse<T> => ({
    success: false,
    message,
    data: undefined,
  }),
  ModelValidationErrorResponse: <T>(
    errorList: T,
    message: string = "Validation error"
  ): ApiResponse<T> => ({
    success: false,
    message,
    data: errorList,
  }),
};
