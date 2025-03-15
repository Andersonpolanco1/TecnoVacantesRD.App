import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
import { VacancyMode, VacancyModeLabels } from "@/types/VacancyMode";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaBullseye,
  FaDollarSign,
  FaMapMarkerAlt,
  FaRegFileAlt,
  FaInfoCircle,
  FaEdit,
} from "react-icons/fa";
import { formatDate, formatLocation, getVacancyStatus } from "@/lib/utils";
import { getStatusIcon, renderHTML } from "@/lib/utilsX";

interface VacancyListItemProps {
  vacancy: VacancyPublicDto | VacancyUserDto;
}

const VacancyListItem = ({ vacancy }: VacancyListItemProps) => {
  const isUserVacancy = "status" in vacancy && "createdAt" in vacancy;

  return (
    <div className="p-3 mb-3 border rounded-lg shadow-sm bg-white">
      <h5 className="font-weight-bold text-primary mb-1 d-flex justify-content-between align-items-center">
        <Link
          href={
            isUserVacancy
              ? `/vacancies/mine/${vacancy.publicId}`
              : `/vacancies/${vacancy.publicId}`
          }
          className="text-primary text-decoration-none d-inline-block text-truncate"
          style={{ maxWidth: "calc(100% - 1.5rem)" }}
        >
          {vacancy.title}
        </Link>
        {isUserVacancy && (
          <button className="btn btn-link p-0 text-primary ms-2">
            <FaEdit />
          </button>
        )}
      </h5>

      <p className="text-muted mb-2">
        <small>{vacancy.categoryName}</small>
      </p>

      {isUserVacancy && (
        <>
          <p className="text-muted text-xs mb-1 d-flex align-items-center">
            {getStatusIcon(vacancy.status)}
            <strong className="ms-2">{getVacancyStatus(vacancy.status)}</strong>
          </p>

          <p className="text-muted text-xs mb-1">
            <FaCalendarAlt className="me-2" /> <strong>Creada:</strong>{" "}
            <span className="text-info">{formatDate(vacancy.createdAt)}</span>
          </p>
        </>
      )}

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
          <span className="fw-bold">
            {formatLocation(vacancy.provinceName)}
          </span>
        </p>

        <div className="text-xs text-muted mb-0 position-relative">
          <FaRegFileAlt className="me-2" /> <strong>Descripción:</strong>{" "}
          <div
            className="description-line-clamp"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "4.5rem",
            }}
          >
            {renderHTML(vacancy.vacancyDescription)}
          </div>
          {/* Contenedor para el botón, separado del texto */}
          <div className="d-flex justify-content-end">
            <Link
              href="#"
              className="btn btn-link p-0 text-decoration-none"
              // In a server-side rendered environment, `onClick` handlers for modals are typically not used.
              // If you want to show more details server-side, you can pass them directly within the component.
            >
              <FaInfoCircle className="ms-2" /> Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyListItem;
