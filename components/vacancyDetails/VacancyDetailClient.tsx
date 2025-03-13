// app/vacancies/mine/[publicId]/VacancyDetailClient.tsx
"use client";

import { useState } from "react";
import VacancyActionButtons from "@/components/VacancyActionButtons";
import { ChangeState } from "@/lib/services/vacanciesService";
import { EnumVacancyTrigger } from "@/lib/utils";
import { VacancyUserDto } from "@/types/vacancy";
import VacancyDetails from "./VacancyDetails";

interface VacancyDetailClientProps {
  vacancy: VacancyUserDto;
}

export default function VacancyDetailClient({
  vacancy,
}: VacancyDetailClientProps) {
  const [currentVacancy, setCurrentVacancy] = useState(vacancy);

  const handleChangeState = async (
    trigger: EnumVacancyTrigger,
    reason?: string
  ) => {
    try {
      await ChangeState(trigger, currentVacancy.publicId, reason);
      // Aquí podrías actualizar el estado si necesitas reflejar el cambio en la UI
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <VacancyActionButtons
        vacancy={currentVacancy}
        onAction={handleChangeState}
      />
      <VacancyDetails vacancy={currentVacancy} />
    </div>
  );
}
