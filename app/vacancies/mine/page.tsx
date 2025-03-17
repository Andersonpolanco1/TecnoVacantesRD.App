import { authOptions } from "@/app/api/auth/authOptions";
import PublicVacancyListItem from "@/components/VacancyListItem";
import ServerPagination from "@/components/ServerPagination";
import { fetchUserVacancies } from "@/lib/services/vacanciesService";
import { VacancyUserDto } from "@/types/vacancy";
import { VacancyUserFilter } from "@/types/VacancyFilters";
import { getServerSession } from "next-auth";
import { RiFilterFill } from "react-icons/ri";
import VacancyUsersFilter from "@/components/VacancyUsersFilter";
import VacancyListItem from "@/components/VacancyListItem";

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
    status: params.status ? Number(params.status) : null,
    currentPage: params.currentPage ? Number(params.currentPage) : 1,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: VacancyUserFilter = parseSearchParams(params);
  const session = await getServerSession(authOptions);

  const response = await fetchUserVacancies(
    filters,
    session?.accessToken ?? ""
  );
  const vacancies: VacancyUserDto[] = response.success
    ? response.data!.items
    : [];

  const currentPage = filters.currentPage ?? 1;
  const totalPages = response.success ? response.data!.totalPagesCount : 0;
  const totalItems = response.success ? response.data!.totalItemsCount : 0;
  const hasFilters = Object.entries(filters).some(
    ([key, value]) => key !== "currentPage" && value !== null
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
        <VacancyUsersFilter />
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
      {/* paginacion */}
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
