import VacancyListItem from "@/components/VacancyListItem";
import ServerPagination from "@/components/ServerPagination";
import VacanciesPublicFilter from "@/components/VacanciesPublicFilters";
import { fetchVacancies } from "@/lib/services/vacanciesService";
import { VacancyPublicDto } from "@/types/vacancy";
import { VacancyPublicFilter } from "@/types/VacancyFilters";
import { RiFilterFill } from "react-icons/ri";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

function parseSearchParams(params: Record<string, string | undefined>) {
  return {
    search: params.search || null,
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

  const currentPage = filters.currentPage ?? 1;
  const totalPages = response.success ? response.data!.totalPagesCount : 0;
  const totalItems = response.success ? response.data!.totalItemsCount : 0;
  const hasFilters = Object.entries(filters).some(
    ([key, value]) => key !== "page" && value !== null
  );

  return (
    <div className="my-4">
      {/* Botón para mostrar/ocultar los filtros */}
      <div className="mb-5 flex items-center gap-4">
        <button
          className="btn btn-sm btn-primary px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
          type="button"
        >
          <RiFilterFill className="mr-2" />
          Filtrar
        </button>

        <span>
          Registros: {totalItems} {hasFilters ? "(filtrados)" : ""}
        </span>
      </div>

      <div className="my-5">
        <VacanciesPublicFilter />
      </div>

      {/* Lista de vacantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vacancies.length ? (
          vacancies.map((vacancy) => (
            <div key={vacancy.publicId}>
              <VacancyListItem vacancy={vacancy} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <div>Sin resultados.</div>
          </div>
        )}
      </div>
      {/* paginación */}
      {totalPages > 1 && (
        <div className="my-3">
          <ServerPagination
            currentPage={currentPage}
            totalPagesCount={totalPages}
          />
        </div>
      )}
    </div>
  );
}
