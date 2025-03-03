import { Vacancy } from "@/types/vacancy";
import { VacancyMode, VacancyModeLabels } from "@/types/VacancyMode";
import {
  FaCalendarAlt,
  FaClock,
  FaBullseye,
  FaDollarSign,
  FaMapMarkerAlt,
  FaPen,
} from "react-icons/fa";

interface VacancyListItemProps {
  vacancy: Vacancy;
}

const VacancyListItem = ({ vacancy }: VacancyListItemProps) => {
  const formatDate = (date: string) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="p-3 mb-3 border rounded-lg shadow-sm bg-white">
      <h5 className="font-weight-bold text-primary mb-1">
        <a
          href={`/vacancies/${vacancy.publicId}`}
          className="text-primary text-decoration-none"
        >
          {vacancy.title}
        </a>
      </h5>
      <p className="text-muted mb-2">
        <small>{vacancy.categoryName}</small>
      </p>

      {/* Contenedor principal que asegura que todo esté apilado verticalmente */}
      <div className="d-flex flex-column">
        <p className="text-muted text-xs mb-1">
          <FaCalendarAlt className="me-2" /> <strong>Publicado:</strong>{" "}
          <span className="text-primary">
            {formatDate(vacancy.publishDate)}
          </span>
        </p>
        <p className="text-muted text-xs mb-1">
          <FaClock className="me-2" /> <strong>Cierre:</strong>{" "}
          <span className="text-danger">{formatDate(vacancy.closeDate)}</span>
        </p>

        <p className="text-xs mb-1">
          <FaBullseye className="me-2" /> <strong>Modalidad:</strong>{" "}
          <span className="text-dark">
            {VacancyModeLabels[vacancy.mode as VacancyMode]}
          </span>
        </p>
        <p className="text-xs mb-1">
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
          <FaPen className="me-2" /> <strong>Descripción:</strong>{" "}
          <span className="text-muted">{vacancy.vacancyDescription}</span>
        </p>
      </div>
    </div>
  );
};

export default VacancyListItem;
