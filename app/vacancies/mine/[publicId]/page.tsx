// app/vacancies/mine/[publicId]/page.tsx

import VacancyDetailServer from "@/components/vacancyDetails/VacancyDetailServer";

interface VacancyDetailPageProps {
  params: { publicId: string };
}

export default function VacancyDetailPage({ params }: VacancyDetailPageProps) {
  return <VacancyDetailServer publicId={params.publicId} />;
}
