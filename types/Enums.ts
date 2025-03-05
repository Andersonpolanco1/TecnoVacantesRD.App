export const EnumVacancyStatusMap: Record<number, string> = {
  0: "Pendiente revisión",
  1: "Aprobada",
  2: "Rechazada",
  3: "Publicada",
  4: "Expirada",
  5: "Cerrada",
};

export const getVacancyStatus = (status: number): string => {
  return EnumVacancyStatusMap[status] || "Desconocido";
};
