"use client";

import GoBackButton from "@/components/public/GoBackButton";
import VacancyDetails from "@/components/public/VacancyDetails";
import {
  ChangeState,
  fetchUserVacancyById,
} from "@/lib/services/vacanciesService";
import { useNotification } from "@/providers/notificationProvider";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { VacancyUserDto } from "@/types/vacancy";
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VacancyActionButtons from "@/components/loggedUsers/VacancyActionButtons";
import { EnumVacancyTrigger } from "@/lib/utils";

export default function VacancyDetailPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = use(params);
  const [vacancy, setVacancy] = useState<VacancyUserDto | null>(null);
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

  const handleChangeState = async (
    trigger: EnumVacancyTrigger,
    reason?: string
  ) => {
    try {
      if (!session?.accessToken) {
        showNotification(NOTIFICATION_COLORS.danger, "Sesión inválida", "");
        return;
      }

      const response = await ChangeState(
        trigger,
        vacancy!.publicId,
        session!.accessToken,
        reason
      );
      if ("newStatus" in response)
        setVacancy((prev) => ({ ...prev!, status: response.newStatus }));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!vacancy) return <p>Vacante no encontrada</p>;

  return (
    <div>
      <div className="row d-flex flex-wrap bg-body my-3">
        <div className="col-4 d-flex justify-content-start">
          <GoBackButton />
        </div>
        <div className="col-8 d-flex justify-content-end">
          <VacancyActionButtons
            vacancy={vacancy}
            onAction={handleChangeState}
          />
        </div>
      </div>

      <VacancyDetails vacancy={vacancy} />
    </div>
  );
}
