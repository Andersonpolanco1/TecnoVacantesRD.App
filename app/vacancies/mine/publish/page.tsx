"use client";

import { useSession } from "next-auth/react";
import { publish } from "@/lib/services/vacanciesService";
import VacancyPost from "@/components/VacancyPost";

const CreateVacancyPage = () => {
  const { data: session } = useSession();

  const handlePublish = async (formData: PublishVacancy) => {
    if (!session) return;

    const result = await publish(formData, session.accessToken as string);
    if (result.success) {
      //usar notificacion
      console.log(result.data);
    } else {
      //usar notificacion
      console.log(result);
    }
  };

  return <VacancyPost onSubmit={handlePublish} />;
};

export default CreateVacancyPage;
