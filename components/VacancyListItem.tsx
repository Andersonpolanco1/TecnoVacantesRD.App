"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaBullseye,
  FaDollarSign,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaEdit,
} from "react-icons/fa";
import {
  EnumVacancyStatus,
  formatDate,
  formatLocation,
  getVacancyStatus,
  removeHtmlTags,
} from "@/lib/utils";
import { getStatusIcon } from "@/lib/utilsX";
import { VacancyMode, VacancyModeLabels } from "@/types/VacancyMode";
import { VacancyPublicDto, VacancyUserDto } from "@/types/vacancy";
import VacancyDescriptionModal from "@/components/VacancyDescriptionModal";
import { CanEdit } from "@/lib/services/vacanciesService";

interface VacancyListItemProps {
  vacancy: VacancyPublicDto | VacancyUserDto;
}

const VacancyListItem = ({ vacancy }: VacancyListItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const isUserVacancy = "status" in vacancy && "createdAt" in vacancy;

  return (
    <div className="p-4 mb-4 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h5 className="font-semibold text-blue-600 mb-2 flex justify-between items-center">
        <Link
          href={
            isUserVacancy
              ? `/vacancies/mine/${vacancy.publicId}`
              : `/vacancies/${vacancy.publicId}`
          }
          className="text-blue-600 hover:text-blue-800 truncate w-full"
        >
          {vacancy.title}
        </Link>
        {isUserVacancy && (
          <Link
            href={`/vacancies/mine/${vacancy.publicId}/edit`}
            className={`ml-2 ${
              CanEdit(vacancy.status as EnumVacancyStatus)
                ? "text-blue-600 hover:text-blue-800"
                : "text-gray-400 cursor-not-allowed"
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

      <p className="text-gray-500 mb-2">
        <small>{vacancy.categoryName}</small>
      </p>

      {isUserVacancy && (
        <>
          <p className="text-gray-500 text-sm mb-1 flex items-center">
            {getStatusIcon(vacancy.status)}
            <strong className="ml-2">{getVacancyStatus(vacancy.status)}</strong>
          </p>

          <p className="text-gray-500 text-sm mb-1 flex items-center">
            <FaCalendarAlt className="mr-2" /> <strong>Creada:</strong>{" "}
            <span>{formatDate(vacancy.createdAt)}</span>
          </p>
        </>
      )}

      <div className="flex flex-col">
        <p className="text-gray-500 text-sm mb-1 flex items-center">
          <FaCalendarAlt className="mr-2" /> <strong>Publicada:</strong>{" "}
          <span className="text-blue-600">
            {formatDate(vacancy.publishedAt)}
          </span>
        </p>

        <p className="text-gray-500 text-sm mb-1 flex items-center">
          <FaClock className="mr-2" /> <strong>Cierre:</strong>{" "}
          <span className="text-red-600">{formatDate(vacancy.expiresAt)}</span>
        </p>

        <p className="text-gray-500 text-sm mb-1 flex items-center">
          <FaBullseye className="mr-2" /> <strong>Modalidad:</strong>{" "}
          <span>{VacancyModeLabels[vacancy.mode as VacancyMode]}</span>
        </p>

        <p className="text-gray-500 text-sm mb-1 flex items-center">
          <FaDollarSign className="mr-2" /> <strong>Salario:</strong>{" "}
          <span className="text-green-600">
            ${vacancy.salary ?? "No especificado"}
          </span>
        </p>

        <p className="text-gray-500 text-sm mb-1 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> <strong>Ubicación:</strong>{" "}
          <span>{formatLocation(vacancy.provinceName)}</span>
        </p>

        <div className="text-sm text-gray-500 mb-0 relative">
          <div
            className="mt-2 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {removeHtmlTags(vacancy.vacancyDescription)}
          </div>
          <div className="flex justify-end">
            <button
              className="text-blue-600 hover:text-blue-800 p-0"
              onClick={() => setShowModal(true)}
            >
              <FaInfoCircle className="ml-2" /> Ver más
            </button>
          </div>
        </div>
      </div>

      <VacancyDescriptionModal
        title={vacancy.title}
        description={vacancy.vacancyDescription}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default VacancyListItem;
