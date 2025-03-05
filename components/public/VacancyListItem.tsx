import { useState } from "react";
import { VacancyPublicDto } from "@/types/vacancy";
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
  FaRegFileAlt,
} from "react-icons/fa";
import VacancyDescriptionModal from "./VacancyDescriptionModal";

interface VacancyListItemProps {
  vacancy: VacancyPublicDto;
}

const VacancyListItem = ({ vacancy }: VacancyListItemProps) => {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date: string) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString();
  };

  const handleShowModal = () => setShowModal(true);

  const shortDescription =
    vacancy.vacancyDescription.length > 100
      ? `${vacancy.vacancyDescription.substring(0, 100)}...`
      : vacancy.vacancyDescription;

  return (
    <div className="p-3 mb-3 border rounded-lg shadow-sm bg-white">
      <h5 className="font-weight-bold text-primary mb-1 d-flex justify-content-between align-items-center">
        <Link
          href={`/vacancies/${vacancy.publicId}`}
          className="text-primary text-decoration-none"
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
        <p className="text-muted text-xs mb-1">
          <FaCalendarAlt className="me-2" /> <strong>Publicada:</strong>{" "}
          <span className="text-primary">
            {formatDate(vacancy.publishedAt)}
          </span>
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
          <span className="fw-bold">{vacancy.provinceName}</span>
        </p>

        <p className="text-xs text-muted mb-0">
          <FaRegFileAlt className="me-2" /> <strong>Descripción:</strong>{" "}
          <span className="text-muted">{shortDescription}</span>
          <button
            className="btn btn-link p-0 ms-2 text-decoration-none"
            onClick={handleShowModal}
          >
            <FaInfoCircle /> Ver más
          </button>
        </p>
      </div>

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
  );
};

export default VacancyListItem;
