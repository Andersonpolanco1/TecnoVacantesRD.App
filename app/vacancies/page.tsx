import PublicVacancyListItem from "@/components/PublicVacancyListItem";
import ServerPagination from "@/components/ServerPagination";
import VacanciesPublicFilter from "@/components/VacanciesPublicFilters";
import { fetchVacancies } from "@/lib/services/vacanciesService";
import { VacancyPublicDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

function parseSearchParams(params: Record<string, string | undefined>) {
  return {
    description: params.description || null,
    salaryFrom: params.salaryFrom ? Number(params.salaryFrom) : null,
    salaryTo: params.salaryTo ? Number(params.salaryTo) : null,
    provinceId: params.provinceId ? Number(params.provinceId) : null,
    mode: params.mode ? Number(params.mode) : null,
    categoryId: params.categoryId ? Number(params.categoryId) : null,
    page: params.page ? Number(params.page) : 1,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: VacancyPublicFilter = parseSearchParams(params);

  const response = await fetchVacancies(filters);
  const vacancies: VacancyPublicDto[] = response.success
    ? response.data!.items
    : [];

  const currentPage = filters.page;
  const totalPages = response.success ? response.data!.totalPagesCount : 0;

  return (
    <>
      {/* Botón para mostrar/ocultar los filtros */}
      <div className="mb-3">
        <button
          className="btn btn-sm btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filtersCollapse"
          aria-expanded="false"
          aria-controls="filtersCollapse"
        >
          Ocultar / ver filtros de búsqueda
        </button>
      </div>

      {/* Contenedor colapsable para los filtros */}
      <div className="collapse show" id="filtersCollapse">
        <VacanciesPublicFilter />
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {vacancies.length ? (
          vacancies.map((vacancy) => (
            <div key={vacancy.publicId}>
              <PublicVacancyListItem vacancy={vacancy} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div>Sin resultados.</div>
          </div>
        )}
        {totalPages > 0 && (
          <div className="my-3">
            <ServerPagination
              currentPage={currentPage}
              totalPagesCount={totalPages}
            />
          </div>
        )}
      </div>
    </>
  );
}
