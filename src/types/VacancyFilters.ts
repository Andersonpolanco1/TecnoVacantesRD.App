import { VacancyMode } from "./VacancyMode";

export interface VacancyFilter {
  description?: string | null; // Permitir que description sea string o null
  salaryFrom?: number | null; // Permitir que salaryFrom sea number o null
  salaryTo?: number | null; // Permitir que salaryTo sea number o null
  location?: string | null; // Permitir que location sea string o null
  mode?: VacancyMode | null; // Permitir que mode sea VacancyMode o null
  categoryId?: number | null; // Permitir que categoryId sea number o null
}
