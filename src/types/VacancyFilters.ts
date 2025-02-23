import { VacancyMode } from "./VacancyMode";

export interface VacancyFilter {
  description?: string | null;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  location?: string | null;
  mode?: VacancyMode | null;
  categoryId?: number | null;
  currentPage?: number | null;
}
