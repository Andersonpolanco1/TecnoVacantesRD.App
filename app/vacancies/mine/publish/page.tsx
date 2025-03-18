"use client";

import { useSession } from "next-auth/react";
import { publish } from "@/lib/services/vacanciesService";
import VacancyPost from "@/components/VacancyPost";
import { useNotification } from "@/providers/notificationProvider";

const CreateVacancyPage = () => {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handlePublish = async (formData: PublishVacancy) => {
    if (!session) return;

    const result = await publish(formData, session.accessToken as string);
    if (result.success) {
      showNotification(
        "success",
        "Vacante en revisión!",
        "Su vacante ha sido creada y puesta en revisión."
      );
    } else {
      showNotification(
        "danger",
        "No se ha publicado su vacante",
        result.message
      );
      console.log(result);
    }
  };

  return <VacancyPost onSubmit={handlePublish} />;
};

export default CreateVacancyPage;
