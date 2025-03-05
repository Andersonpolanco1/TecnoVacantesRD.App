import { useState } from "react";
import { VacancyUserDto } from "@/types/vacancy";
import { VacancyMode, VacancyModeLabels } from "@/types/VacancyMode";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaBullseye,
  FaDollarSign,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaClock as FaPendingIcon,
  FaRegFileAlt,
} from "react-icons/fa";
import VacancyDescriptionModal from "./VacancyDescriptionModal";

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

interface VacancyListItemProps {
  vacancy: VacancyUserDto;
}

const VacancyUserListItem = ({ vacancy }: VacancyListItemProps) => {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date: string) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString();
  };

  const formatLocation = (provinceName?: string) => {
    if (!provinceName) return "No disponible";
    return provinceName;
  };

  const handleShowModal = () => setShowModal(true);

  const shortDescription =
    vacancy.vacancyDescription.length > 100
      ? `${vacancy.vacancyDescription.substring(0, 100)}...`
      : vacancy.vacancyDescription;

  // Obtener el icono correspondiente al estado
  const getStatusIcon = (status: number) => {
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
        return <FaPendingIcon className="text-warning" />;
    }
  };

  return (
    <div className="p-3 mb-3 border rounded-lg shadow-sm bg-white">
      <h5 className="font-weight-bold text-primary mb-1 d-flex justify-content-between align-items-center">
        <Link
          href={`/vacancies/${vacancy.publicId}`}
          className="text-primary text-decoration-none text-break"
        >
          {vacancy.title}
        </Link>
        <button className="btn btn-link p-0 text-primary" onClick={() => {}}>
          <FaEdit />
        </button>
      </h5>

      <p className="text-muted mb-2">
        <small>{vacancy.categoryName}</small>
      </p>

      <div className="d-flex flex-column">
        {/* Estado y fecha de creación */}
        <p className="text-muted text-xs mb-1 d-flex align-items-center">
          {getStatusIcon(vacancy.status)}{" "}
          <strong className="ms-2">{getVacancyStatus(vacancy.status)}</strong>
        </p>

        <p className="text-muted text-xs mb-1">
          <FaCalendarAlt className="me-2" /> <strong>Publicada:</strong>{" "}
          <span className="text-primary">
            {formatDate(vacancy.publishedAt)}
          </span>
        </p>

        {/* Nueva sección: Fecha de creación */}
        <p className="text-muted text-xs mb-1">
          <FaCalendarAlt className="me-2" /> <strong>Creada:</strong>{" "}
          <span className="text-info">{formatDate(vacancy.createdAt)}</span>
        </p>

        <p className="text-muted text-xs mb-1">
          <FaClock className="me-2" /> <strong>Cierre:</strong>{" "}
          <span className="text-danger">{formatDate(vacancy.expiresAt)}</span>
        </p>

        <p className="text-muted text-xs mb-1">
          <FaBullseye className="me-2" /> <strong>Modalidad:</strong>{" "}
          <span className="text-dark">
            {VacancyModeLabels[vacancy.mode as VacancyMode]}
          </span>
        </p>
        <p className="text-muted text-xs mb-1">
          <FaDollarSign className="me-2" /> <strong>Salario:</strong>{" "}
          <span className="text-success">
            ${vacancy.salary ?? "No especificado"}
          </span>
        </p>

        <p className="text-muted text-xs mb-1">
          <FaMapMarkerAlt className="me-2" />{" "}
          <span className="fw-bold">
            {formatLocation(vacancy.provinceName)}
          </span>
        </p>

        <p
          className="text-xs text-muted mb-0"
          style={{ wordWrap: "break-word" }}
        >
          <FaRegFileAlt className="me-2" /> <strong>Descripción:</strong>{" "}
          <span className="text-muted text-break">{shortDescription}</span>
          <button
            className="btn btn-link p-0 ms-2 text-decoration-none"
            onClick={handleShowModal}
          >
            <FaInfoCircle /> Ver más
          </button>
        </p>

        {/* Modal de descripción */}
        {showModal && (
          <VacancyDescriptionModal
            title={vacancy.title}
            description={vacancy.vacancyDescription}
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default VacancyUserListItem;
