import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

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

export const getStatusIcon = (status: number) => {
  switch (status) {
    case 1: // Aprobada
      return <FaCheckCircle className="text-success" />;
    case 2: // Rechazada
      return <FaTimesCircle className="text-danger" />;
    case 3: // Publicada
      return <FaClock className="text-info" />;
    case 4: // Expirada
      return <FaClock className="text-muted" />;
    case 5: // Cerrada
      return <FaTimesCircle className="text-secondary" />;
    default: // Pendiente revisión
      return <FaClock className="text-warning" />;
  }
};

export const getShortDescription = (
  vacancyDescription: string,
  maxLenght: number = 100
): string => {
  return vacancyDescription.length > maxLenght
    ? `${vacancyDescription.substring(0, maxLenght)}...`
    : vacancyDescription;
};
