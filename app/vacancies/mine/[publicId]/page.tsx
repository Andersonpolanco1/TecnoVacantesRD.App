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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VacancyActionButtons from "@/components/loggedUsers/VacancyActionButtons";
import { EnumVacancyTrigger } from "@/lib/utils";

export default function VacancyDetailPage({
  params,
}: {
  params: { publicId: string };
}) {
  const { publicId } = params;
  const [vacancy, setVacancy] = useState<VacancyUserDto | undefined>(undefined);
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
      setLoading(false);
      return;
    }

    if (!session?.accessToken) {
      showNotification(NOTIFICATION_COLORS.danger, "Sesión inválida", "");
      setLoading(false);
      return;
    }

    const loadVacancy = async () => {
      const response = await fetchUserVacancyById(
        publicId,
        session.accessToken!
      );

      if (!response.success) {
        showNotification(
          NOTIFICATION_COLORS.danger,
          "No se pudo obtener la vacante",
          response?.message
        );
        setLoading(false);
        return;
      }

      console.log(response.data);
      setVacancy(response.data);
      setLoading(false);
    };

    loadVacancy();
  }, [publicId, session?.accessToken, showNotification]);

  const handleChangeState = async (
    trigger: EnumVacancyTrigger,
    reason?: string
  ) => {
    if (!session?.accessToken) {
      showNotification(NOTIFICATION_COLORS.danger, "Sesión inválida", "");
      return;
    }

    const response = await ChangeState(
      trigger,
      vacancy!.publicId,
      session.accessToken!,
      reason
    );

    if (!response.success) {
      showNotification(
        NOTIFICATION_COLORS.danger,
        "No se pudo cambiar el estado",
        response.message
      );
      return;
    }

    setVacancy((prev) => ({
      ...prev!,
      status: response.data?.newStatus!,
    }));
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
