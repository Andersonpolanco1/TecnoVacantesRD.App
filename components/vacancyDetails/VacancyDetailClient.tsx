// app/vacancies/mine/[publicId]/VacancyDetailClient.tsx
"use client";

import { useState } from "react";
import VacancyActionButtons from "@/components/VacancyActionButtons";
import { ChangeState } from "@/lib/services/vacanciesService";
import { EnumVacancyStatus, EnumVacancyTrigger } from "@/lib/apputils";
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
      const result = await ChangeState(
        trigger,
        currentVacancy.publicId,
        reason
      );
      setCurrentVacancy((prev) => ({
        ...prev,
        status: result.data?.newStatus as EnumVacancyStatus,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="my-3">
        <VacancyActionButtons
          vacancy={currentVacancy}
          onAction={handleChangeState}
        />
      </div>
      <VacancyDetails vacancy={currentVacancy} />
    </div>
  );
}
