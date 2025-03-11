// app/vacancies/mine/[publicId]/VacancyDetailServer.tsx
import { authOptions } from "@/app/api/auth/authOptions";
import { fetchUserVacancyById } from "@/lib/services/vacanciesService";
import { getServerSession } from "next-auth";
import { VacancyUserDto } from "@/types/vacancy";
import VacancyDetailClient from "./VacancyDetailClient";

interface VacancyDetailServerProps {
  publicId: string;
}

export default async function VacancyDetailServer({
  publicId,
}: VacancyDetailServerProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <p>Acceso no autorizado</p>;
  }

  const response = await fetchUserVacancyById(publicId, session.accessToken);

  if (!response.success) {
    return <p>Vacante no encontrada</p>;
  }

  const vacancy: VacancyUserDto = response.data as VacancyUserDto;

  return <VacancyDetailClient vacancy={vacancy} />;
}
