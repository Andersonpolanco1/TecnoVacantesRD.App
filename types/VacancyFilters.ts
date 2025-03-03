import { VacancyMode } from "./VacancyMode";

export interface VacancyFilter {
  description?: string | null;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  provinceId?: number | null;
  mode?: VacancyMode | null;
  categoryId?: number | null;
  currentPage?: number | null;
}
