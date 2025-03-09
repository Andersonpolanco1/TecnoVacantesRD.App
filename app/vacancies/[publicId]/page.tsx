"use client";

import GoBackButton from "@/components/public/GoBackButton";
import VacancyDetails from "@/components/public/VacancyDetails";
import { fetchVacancyById } from "@/lib/services/vacanciesService";
import { useNotification } from "@/providers/notificationProvider";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { VacancyPublicDto } from "@/types/vacancy";
import { use, useEffect, useState } from "react";

export default function VacancyDetailPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = use(params);
  const [vacancy, setVacancy] = useState<VacancyPublicDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!publicId) return;

    const loadVacancy = async () => {
      const response = await fetchVacancyById(publicId);

      if (!response.success) {
        showNotification(
          NOTIFICATION_COLORS.danger,
          "No se pudo obtener la vacante",
          response.message
        );
        return;
      }
      setVacancy(response.data as VacancyPublicDto);
      setLoading(false);
    };

    loadVacancy();
  }, [publicId, showNotification]);

  if (loading) return <div>Loading...</div>;
  if (!vacancy) return <p>Vacante no encontrada</p>;

  return (
    <div>
      <GoBackButton />
      <VacancyDetails vacancy={vacancy} />
    </div>
  );
}
