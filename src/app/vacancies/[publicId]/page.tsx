import VacancyDetails from "@/components/Vacancy/VacancyDetails";
import { fetchVacancyById } from "@/lib/services/vacanciesService";

interface Params {
  params: {
    publicId: string;
  };
}

const VacancyDetailPage = async ({ params }: Params) => {
  const { publicId } = params;
  const vacancy = await fetchVacancyById(publicId);
  if (!vacancy) return <p>Vacante no encontrada</p>;

  return <VacancyDetails vacancy={vacancy} />;
};

export default VacancyDetailPage;
