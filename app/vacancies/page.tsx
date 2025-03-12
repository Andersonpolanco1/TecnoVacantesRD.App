// app/vacancies/page.tsx

import VacanciesPublicListClient from "@/components/vacanciesPublicList/vacanciesPublicListClient";
import { fetchVacancies } from "@/lib/services/vacanciesService";
import { VacancyPublicDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";
import { VacancyMode } from "@/types/VacancyMode";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

function parseSearchParams(params: Record<string, string | undefined>) {
  return {
    description: params.description || null,
    salaryFrom: params.salaryFrom ? Number(params.salaryFrom) : null,
    salaryTo: params.salaryTo ? Number(params.salaryTo) : null,
    provinceId: params.provinceId ? Number(params.provinceId) : null,
    mode: params.mode ? (Number(params.mode) as VacancyMode) : null,
    categoryId: params.categoryId ? Number(params.categoryId) : null,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const para = await searchParams;
  const filters: VacancyPublicFilter = parseSearchParams(para);

  const response = await fetchVacancies(filters);
  const vacancies: VacancyPublicDto[] = response.success
    ? response.data!.items
    : [];

  const currentPage = response.success ? response.data!.currentPage : 1;
  const totalPages = response.success ? response.data!.totalPagesCount : 0;

  return (
    <VacanciesPublicListClient
      initialVacancies={vacancies}
      initialFilters={filters}
      initialPage={currentPage}
      totalPages={totalPages}
    />
  );
}
