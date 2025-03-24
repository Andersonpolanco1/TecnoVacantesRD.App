"use client";

import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
import { VacancyMode, VacancyModeLabels } from "@/types/VacancyMode";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaBullseye,
  FaDollarSign,
  FaMapMarkerAlt,
  FaEdit,
  FaRegFileAlt,
} from "react-icons/fa";
import {
  EnumVacancyStatus,
  formatDate,
  formatLocation,
  getVacancyStatus,
} from "@/lib/apputils";
import { getStatusIcon, renderHTML } from "@/lib/apputilsX";
import { CanEdit } from "@/lib/services/vacanciesService";

interface VacancyListItemProps {
  vacancy: VacancyPublicDto | VacancyUserDto;
}

const VacancyListItem = ({ vacancy }: VacancyListItemProps) => {
  const isUserVacancy = "status" in vacancy && "createdAt" in vacancy;

  return (
    <div className="p-4 my-4 bg-white shadow-lg rounded-lg">
      <h5 className="font-bold text-primary mb-1 flex justify-between items-center">
        <div
          className="text-primary text-decoration-none inline-block truncate"
          style={{ maxWidth: "calc(100% - 1.5rem)" }}
        >
          {vacancy.title}
        </div>
        {isUserVacancy && (
          <Link
            href={`/dashboard/vacancies/mine/${vacancy.publicId}/edit`}
            className={`ml-2 ${
              CanEdit(vacancy.status as EnumVacancyStatus)
                ? "text-primary"
                : "text-gray-400"
            }`}
            style={
              CanEdit(vacancy.status as EnumVacancyStatus)
                ? {}
                : { pointerEvents: "none" }
            }
            aria-disabled={!CanEdit(vacancy.status as EnumVacancyStatus)}
          >
            <FaEdit />
          </Link>
        )}
      </h5>
      <p className="text-gray-600 mb-2">
        <small>{vacancy.categoryName}</small>
      </p>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isUserVacancy && (
            <p className="text-gray-600 text-xs mb-1 flex items-center">
              {getStatusIcon(vacancy.status)}
              <strong className="ml-2">
                {getVacancyStatus(vacancy.status)}
              </strong>
            </p>
          )}

          <p className="text-gray-600 text-xs mb-1 flex items-center">
            <FaCalendarAlt className="mr-2" /> <strong>Publicada:</strong>{" "}
            <span className="text-primary ml-1">
              {formatDate(vacancy.publishedAt)}
            </span>
          </p>

          {isUserVacancy && (
            <p className="text-gray-600 text-xs mb-1 flex items-center">
              <FaCalendarAlt className="mr-2" /> <strong>Creada:</strong>{" "}
              <span className="ml-1">{formatDate(vacancy.createdAt)}</span>
            </p>
          )}

          <p className="text-gray-600 text-xs mb-1 flex items-center">
            <FaClock className="mr-2" /> <strong>Cierre:</strong>{" "}
            <span className="text-red-600 ml-1">
              {formatDate(vacancy.expiresAt)}
            </span>
          </p>

          <p className="text-gray-600 text-xs mb-1 flex items-center">
            <FaBullseye className="mr-2" /> <strong>Modalidad:</strong>{" "}
            <span className="ml-1">
              {VacancyModeLabels[vacancy.mode as VacancyMode]}
            </span>
          </p>

          <p className="text-gray-600 text-xs mb-1 flex items-center">
            <FaDollarSign className="mr-2" /> <strong>Salario:</strong>{" "}
            <span className="text-green-600 ml-1">
              ${vacancy.salary ?? "No especificado"}
            </span>
          </p>

          <p className="text-gray-600 text-xs mb-1 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <strong>Ubicación:</strong>{" "}
            <span className="ml-1">{formatLocation(vacancy.provinceName)}</span>
          </p>
        </div>
      </div>
      <br />
      <div className="text-xs text-gray-600 mb-0 relative text-justify">
        <div className="flex items-center">
          <FaRegFileAlt className="mr-2" />
          <strong>Descripción:</strong>
        </div>
        <div
          className="w-full my-3"
          style={{
            wordWrap: "break-word",
            whiteSpace: "normal",
            overflowWrap: "break-word",
            wordBreak: "break-all",
          }}
        >
          {renderHTML(vacancy.vacancyDescription)}
        </div>
      </div>
    </div>
  );
};

export default VacancyListItem;
