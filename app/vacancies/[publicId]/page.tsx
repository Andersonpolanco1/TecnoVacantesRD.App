"use client";

import GoBackButton from "@/components/public/GoBackButton";
import VacancyDetails from "@/components/public/VacancyDetails";
import { fetchVacancyById } from "@/lib/services/vacanciesService";
import { useNotification } from "@/providers/notificationProvider";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { VacancyPublicDto } from "@/types/vacancy";
import { useEffect, useState } from "react";

interface Params {
  params: {
    publicId: string;
  };
}

const VacancyDetailPage = ({ params }: Params) => {
  const { publicId } = params;
  const [vacancy, setVacancy] = useState<VacancyPublicDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const loadVacancy = async () => {
      const data = await fetchVacancyById(publicId);

      if (!data) {
        showNotification(
          NOTIFICATION_COLORS.danger,
          "Error de comunicación",
          "No se pudieron obtener las vacantes."
        );
        return;
      }
      setVacancy(data);
      setLoading(false);
    };
    loadVacancy();
  }, [publicId]);

  if (loading) return <div>Loading...</div>;
  if (!vacancy) return <p>Vacante no encontrada</p>;

  return (
    <div>
      <GoBackButton />
      <VacancyDetails vacancy={vacancy} />
    </div>
  );
};

export default VacancyDetailPage;
