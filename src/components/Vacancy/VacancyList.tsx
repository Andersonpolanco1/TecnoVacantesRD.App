// components/VacancyList.tsx
import { Vacancy } from "@/types/vacancy";
import VacancyListItem from "@/components/Vacancy/VacancyListItem";

interface VacancyListProps {
  vacancies: Vacancy[];
}

export default function VacancyList({ vacancies }: VacancyListProps) {
  return (
    <ul className="vacancy-list list-unstyled">
      {vacancies.length > 0 ? (
        vacancies.map((vacancy) => (
          <li key={vacancy.publicId} className="mb-4">
            <VacancyListItem vacancy={vacancy} />
          </li>
        ))
      ) : (
        <p className="text-muted text-center">No hay vacantes disponibles.</p>
      )}
    </ul>
  );
}
