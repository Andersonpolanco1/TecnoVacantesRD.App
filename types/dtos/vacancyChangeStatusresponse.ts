import { EnumVacancyStatus } from "@/lib/apputils";

export interface VacancyChangeStatusResponse {
  publicId: string;
  newStatus: EnumVacancyStatus;
}
