"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import {
  CanEdit,
  fetchUserVacancyById,
  update,
} from "@/lib/services/vacanciesService";
import VacancyPost from "@/components/VacancyPost";
import { ApiResponse } from "@/types/dtos/ApiResponse";
import { VacancyUserDto } from "@/types/vacancy";
import { useNotification } from "@/providers/notificationProvider";
import { EnumVacancyStatus } from "@/lib/apputils";

interface VacancyDetailPageProps {
  params: Promise<{ publicId: string }>;
}

const Page = ({ params }: VacancyDetailPageProps) => {
  const { data: session } = useSession();
  const resolvedParams = use(params);
  const [response, setResponse] = useState<ApiResponse<VacancyUserDto>>();
  const { showNotification } = useNotification();

  const parseData = (vacancy: VacancyUserDto) => {
    const vacancyData = {
      title: vacancy?.title,
      description: vacancy?.vacancyDescription,
      salary: vacancy?.salary,
      provinceId: vacancy?.provinceId ?? undefined,
      mode: vacancy?.mode,
      categoryId: vacancy?.categoryId,
    };

    return vacancyData as PublishVacancy;
  };

  useEffect(() => {
    const loadVacancy = async () => {
      if (!session) return;
      const result = await fetchUserVacancyById(
        resolvedParams.publicId,
        session.accessToken as string
      );
      setResponse(result);
    };

    loadVacancy();
  }, []);

  const handleUpdate = async (formData: PublishVacancy) => {
    if (!session) return;
    const result = await update(
      resolvedParams.publicId,
      formData,
      session.accessToken as string
    );
    if (result.success) {
      showNotification("success", "Vacante publicada");
    } else {
      showNotification("danger", "Vacante no publicada", result?.message);
    }
  };

  if (!response?.success)
    return <p>No se pudo obtener la vacante. {response?.message}</p>;

  if (!CanEdit(response.data?.status as EnumVacancyStatus)) {
    return <p>Esta vacante ya no se puede editar</p>;
  }
  return (
    <VacancyPost
      onSubmit={handleUpdate}
      editMode={true}
      initialData={parseData(response.data!)}
    />
  );
};

export default Page;
