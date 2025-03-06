"use client";

import GoBackButton from "@/components/public/GoBackButton";
import VacancyDetails from "@/components/public/VacancyDetails";
import { fetchUserVacancyById } from "@/lib/services/vacanciesService";
import { useNotification } from "@/providers/notificationProvider";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Params {
  params: {
    publicId: string;
  };
}

const VacancyDetailPage = ({ params }: Params) => {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [vacancy, setVacancy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.accessToken) {
      showNotification(NOTIFICATION_COLORS.danger, "Sesión inválida", "");
      return;
    }

    const fetchVacancy = async () => {
      setLoading(true);
      const data = await fetchUserVacancyById(
        params.publicId,
        session.accessToken!
      );
      console.log(data);

      //validar data
      setVacancy(data);
      setLoading(false);
    };

    fetchVacancy();
  }, [params.publicId, session?.accessToken, showNotification]);

  if (!session?.accessToken) return <p>Sesión inválida</p>;
  if (loading) return <p>Cargando vacante...</p>;
  if (!vacancy) return <p>Vacante no encontrada</p>;
  console.log(vacancy);
  return (
    <>
      <GoBackButton />
      <VacancyDetails vacancy={vacancy} />
    </>
  );
};

export default VacancyDetailPage;
