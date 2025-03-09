import { EnumVacancyStatus } from "@/lib/utils";

export interface VacancyChangeStatusResponse {
  publicId: string;
  newStatus: EnumVacancyStatus;
}
