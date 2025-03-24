// app/vacancies/mine/[publicId]/page.tsx
import { authOptions } from "@/app/api/auth/authOptions";
import { fetchUserVacancyById } from "@/lib/services/vacanciesService";
import { getServerSession } from "next-auth";
import { VacancyUserDto } from "@/types/vacancy";
import VacancyDetailClient from "@/components/vacancyDetails/VacancyDetailClient";

interface VacancyDetailPageProps {
  params: { publicId: string };
}

export default async function Page({ params }: VacancyDetailPageProps) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <p>Acceso no autorizado</p>;
  }

  const response = await fetchUserVacancyById(
    resolvedParams.publicId,
    session.accessToken
  );

  if (!response.success) {
    return <p>Vacante no encontrada</p>;
  }

  const vacancy: VacancyUserDto = response.data as VacancyUserDto;

  return (
    <>
      <div className="my-5">
        <h1
          className="text-lg font-semibold"
          style={{ color: "var(--sidebar)" }}
        >
          Detalles de Vacante
        </h1>
        <hr></hr>
      </div>
      <br />
      <VacancyDetailClient vacancy={vacancy} />
    </>
  );
}
