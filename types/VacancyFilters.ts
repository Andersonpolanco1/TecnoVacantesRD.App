import { VacancyMode } from "./VacancyMode";

export interface VacancyPublicFilter {
  page: number;
  description?: string | null;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  provinceId?: number | null;
  mode?: VacancyMode | null;
  categoryId?: number | null;
  currentPage?: number | null;
}

export interface VacancyUserFilter extends VacancyPublicFilter {
  status?: number | null;
}
