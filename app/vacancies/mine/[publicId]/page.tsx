"use client";

import GoBackButton from "@/components/public/GoBackButton";
import VacancyDetails from "@/components/public/VacancyDetails";
import { fetchUserVacancyById } from "@/lib/services/vacanciesService";
import { useNotification } from "@/providers/notificationProvider";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { VacancyPublicDto } from "@/types/vacancy";
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export default function VacancyDetailPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = use(params);
  const [vacancy, setVacancy] = useState<VacancyPublicDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  const { data: session } = useSession();

  useEffect(() => {
    if (!publicId) {
      showNotification(
        NOTIFICATION_COLORS.danger,
        "ID de notificación inválido",
        ""
      );
    }

    if (!session?.accessToken) {
      showNotification(NOTIFICATION_COLORS.danger, "Sesión inválida", "");
      return;
    }

    const loadVacancy = async () => {
      const data = await fetchUserVacancyById(publicId, session.accessToken!);
      const success = data && "publicId" in data;

      if (!success) {
        showNotification(
          NOTIFICATION_COLORS.danger,
          "Error de comunicación",
          data?.message as string
        );
        return;
      }
      setVacancy(data);
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
