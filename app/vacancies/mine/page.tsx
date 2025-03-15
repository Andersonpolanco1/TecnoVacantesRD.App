import { authOptions } from "@/app/api/auth/authOptions";
import PublicVacancyListItem from "@/components/VacancyListItem";
import ServerPagination from "@/components/ServerPagination";
import { fetchUserVacancies } from "@/lib/services/vacanciesService";
import { VacancyUserDto } from "@/types/vacancy";
import { VacancyUserFilter } from "@/types/VacancyFilters";
import { getServerSession } from "next-auth";
import { RiFilterFill } from "react-icons/ri";
import VacancyUsersFilter from "@/components/VacancyUsersFilter";

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
  //obtener token
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
          <RiFilterFill className="me-2" />
          Filtrar
        </button>
        <span className="fw-bold small ms-2">
          Registros: {totalItems} {hasFilters ? "(filtrados)" : ""}
        </span>
      </div>
      {/* Contenedor colapsable para los filtros */}
      <div className="collapse" id="filtersCollapse">
        <VacancyUsersFilter />
      </div>
      {/* Lista de vacantes */}
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
    </>
  );
}
