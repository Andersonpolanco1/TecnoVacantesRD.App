import VacancyDetails from "@/components/Vacancy/VacancyDetails";
import { fetchVacancyById } from "@/lib/services/vacanciesService";
import { Suspense } from "react";

interface Params {
  params: {
    publicId: string;
  };
}

const VacancyDetailPage = async ({ params }: Params) => {
  const { publicId } = params;
  const vacancy = await fetchVacancyById(publicId);
  if (!vacancy) return <p>Vacante no encontrada</p>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VacancyDetails vacancy={vacancy} />
    </Suspense>
  );
};

export default VacancyDetailPage;
