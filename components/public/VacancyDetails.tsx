import { getVacancyStatus } from "@/lib/utils";
import { getStatusIcon } from "@/lib/utilsX";
import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
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
  vacancy: VacancyPublicDto | VacancyUserDto;
}

const VacancyDetails: React.FC<VacancyDetailProps> = ({ vacancy }) => {
  const formatDate = (date: string) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-bold text-blue-600 mb-4">{vacancy.title}</h2>

      {/* Estado de la vacante (solo si es VacancyUserDto) */}
      {"status" in vacancy && (
        <div className="flex items-center mb-2">
          {getStatusIcon(vacancy.status)}
          <strong className="ml-2">{getVacancyStatus(vacancy.status)}</strong>
        </div>
      )}

      {/* Detalles de la vacante */}
      <p className="text-gray-600 text-sm flex items-center mb-2">
        <FaCalendarAlt className="mr-2" /> <strong>Publicado:</strong>{" "}
        <span className="text-blue-500">{formatDate(vacancy.publishedAt)}</span>
      </p>

      {"createdAt" in vacancy && (
        <p className="text-gray-600 text-sm flex items-center mb-2">
          <FaCalendarAlt className="mr-2" /> <strong>Creada:</strong>{" "}
          <span className="text-green-500">
            {formatDate(vacancy.createdAt)}
          </span>
        </p>
      )}

      <p className="text-gray-600 text-sm flex items-center mb-2">
        <FaClock className="mr-2" /> <strong>Cierre:</strong>{" "}
        <span className="text-red-500">{formatDate(vacancy.expiresAt)}</span>
      </p>

      <p className="text-gray-800 text-sm flex items-center mb-2">
        <FaBullseye className="mr-2" /> <strong>Modalidad:</strong>{" "}
        <span className="text-gray-700">
          {VacancyModeLabels[vacancy.mode as VacancyMode]}
        </span>
      </p>

      <p className="text-gray-800 text-sm flex items-center mb-2">
        <FaDollarSign className="mr-2" /> <strong>Salario:</strong>{" "}
        <span className="text-green-600">
          ${vacancy.salary ?? "No especificado"}
        </span>
      </p>

      <p className="text-gray-800 text-sm flex items-center mb-2">
        <FaMapMarkerAlt className="mr-2" /> <strong>Ubicación:</strong>{" "}
        <span className="font-bold">{vacancy.provinceName}</span>
      </p>

      <p className="text-gray-700 text-sm flex items-center mb-2">
        <FaPen className="mr-2" /> <strong>Descripción:</strong>{" "}
        <span className="text-gray-600">{vacancy.vacancyDescription}</span>
      </p>

      {/* Botón para postularse */}
      <div className="mt-4">
        <Link
          href={`/vacancies/${vacancy.publicId}/apply`}
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Postúlate ahora
        </Link>
      </div>
    </div>
  );
};

export default VacancyDetails;
