// app/vacancies/mine/[publicId]/page.tsx

import { authOptions } from "@/app/api/auth/authOptions";
import VacancyDetails from "@/components/public/VacancyDetails";
import { fetchUserVacancyById } from "@/lib/services/vacanciesService";
import { VacancyUserDto } from "@/types/vacancy";
import { getServerSession } from "next-auth";

interface VacancyDetailPageProps {
  params: { publicId: string };
}

export default async function VacancyDetailPage({
  params,
}: VacancyDetailPageProps) {
  const { publicId } = await params;

  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <p>Acceso no autorizado</p>;
  }

  const response = await fetchUserVacancyById(publicId, session.accessToken);

  if (!response.success) {
    console.log(response);
    return <p>Vacante no encontrada</p>;
  }

  const vacancy: VacancyUserDto = response.data as VacancyUserDto;

  return (
    <div>
      <VacancyDetails vacancy={vacancy} />
    </div>
  );
}
