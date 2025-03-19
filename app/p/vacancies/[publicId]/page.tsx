// app/vacancies/[publicId]/page.tsx

import VacancyDetails from "@/components/vacancyDetails/VacancyDetails";
import { fetchVacancyById } from "@/lib/services/vacanciesService";
import { VacancyPublicDto } from "@/types/vacancy";

interface VacancyDetailPageProps {
  params: { publicId: string };
}

export default async function VacancyDetailPage({
  params,
}: VacancyDetailPageProps) {
  const { publicId } = await params;

  const response = await fetchVacancyById(publicId);

  if (!response.success) {
    return <p>Vacante no encontrada</p>;
  }

  const vacancy: VacancyPublicDto = response.data as VacancyPublicDto;

  return (
    <div>
      <VacancyDetails vacancy={vacancy} />
    </div>
  );
}
