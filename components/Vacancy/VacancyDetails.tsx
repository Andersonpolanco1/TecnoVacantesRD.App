import { VacancyPublicDto } from "@/types/vacancy";
import { VacancyMode, VacancyModeLabels } from "@/types/VacancyMode";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaBullseye,
  FaDollarSign,
  FaMapMarkerAlt,
  FaPen,
} from "react-icons/fa";

interface VacancyDetailProps {
  vacancy: VacancyPublicDto;
}

const VacancyDetails = ({ vacancy }: VacancyDetailProps) => {
  const formatDate = (date: string) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-weight-bold text-primary mb-4">{vacancy.title}</h2>

      {/* Detalles de la vacante */}
      <div className="d-flex flex-column">
        <p className="text-muted text-xs mb-2">
          <FaCalendarAlt className="me-2" /> <strong>Publicado:</strong>{" "}
          <span className="text-primary">
            {formatDate(vacancy.publishedAt)}
          </span>
        </p>
        <p className="text-muted text-xs mb-2">
          <FaClock className="me-2" /> <strong>Cierre:</strong>{" "}
          <span className="text-danger">{formatDate(vacancy.expiresAt)}</span>
        </p>

        <p className="text-xs mb-2">
          <FaBullseye className="me-2" /> <strong>Modalidad:</strong>{" "}
          <span className="text-dark">
            {VacancyModeLabels[vacancy.mode as VacancyMode]}
          </span>
        </p>
        <p className="text-xs mb-2">
          <FaDollarSign className="me-2" /> <strong>Salario:</strong>{" "}
          <span className="text-success">
            ${vacancy.salary ?? "No especificado"}
          </span>
        </p>

        <p className="text-muted text-xs mb-2">
          <FaMapMarkerAlt className="me-2" /> <strong>Ubicación:</strong>{" "}
          <span className="fw-bold">{vacancy.provinceName}</span>
        </p>

        <p className="text-muted text-xs mb-2">
          <FaPen className="me-2" /> <strong>Descripción:</strong>{" "}
          <span className="text-muted">{vacancy.vacancyDescription}</span>
        </p>
      </div>

      {/* Botón para postularse */}
      <div className="mt-4">
        <Link
          href={`/vacancies/${vacancy.publicId}/apply`}
          className="btn btn-primary"
        >
          Postúlate ahora
        </Link>
      </div>
    </div>
  );
};

export default VacancyDetails;
