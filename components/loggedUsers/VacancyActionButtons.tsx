"use client";

import {
  FaCheck,
  FaTimes,
  FaPen,
  FaCloudUploadAlt,
  FaLock,
  FaRegClock,
} from "react-icons/fa";
import { VacancyUserDto } from "@/types/vacancy";
import { useState } from "react";
import { EnumVacancyStatus, EnumVacancyTrigger } from "@/lib/utils";

interface VacancyActionButtonsProps {
  vacancy: VacancyUserDto;
  onAction: (trigger: EnumVacancyTrigger) => void;
}

const VacancyActionButtons = ({
  vacancy,
  onAction,
}: VacancyActionButtonsProps) => {
  const [loading, setLoading] = useState(false);
  const getButtonActions = () => {
    switch (vacancy.status) {
      case EnumVacancyStatus.PendingReview:
        return (
          <>
            <button
              className="btn btn-sm btn-success me-2"
              onClick={() => handleAction(EnumVacancyTrigger.Approve)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaCheck /> Aprobar
                </>
              )}
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleAction(EnumVacancyTrigger.Reject)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaTimes /> Rechazar
                </>
              )}
            </button>
          </>
        );
      case EnumVacancyStatus.Approved:
        return (
          <>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleAction(EnumVacancyTrigger.Publish)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaCloudUploadAlt /> Publicar
                </>
              )}
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleAction(EnumVacancyTrigger.Close)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaLock /> Cerrar
                </>
              )}
            </button>
          </>
        );
      case EnumVacancyStatus.Published:
        return (
          <>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => handleAction(EnumVacancyTrigger.Expire)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaRegClock /> Expirar
                </>
              )}
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleAction(EnumVacancyTrigger.Close)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaLock /> Cerrar
                </>
              )}
            </button>
          </>
        );
      case EnumVacancyStatus.Expired:
        return (
          <>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => handleAction(EnumVacancyTrigger.ReviewAgain)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaPen /> Revisar nuevamente
                </>
              )}
            </button>
          </>
        );
      case EnumVacancyStatus.Closed:
        return (
          <>
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleAction(EnumVacancyTrigger.Reopen)}
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : (
                <>
                  <FaPen /> Reabrir
                </>
              )}
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const handleAction = (trigger: EnumVacancyTrigger) => {
    setLoading(true);
    try {
      onAction(trigger);
    } catch (error) {
      console.error("Error al ejecutar la acción", error);
    } finally {
      setLoading(false);
    }
  };

  return <div className="d-flex justify-content-end">{getButtonActions()}</div>;
};

export default VacancyActionButtons;
