"use client";
import { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
  FaLock,
  FaRegClock,
  FaRedo,
  FaUndo,
} from "react-icons/fa";
import { EnumVacancyStatus, EnumVacancyTrigger } from "@/lib/utils";

interface VacancyActionButtonsProps {
  vacancy: { publicId: string; status: EnumVacancyStatus };
  onAction: (trigger: EnumVacancyTrigger, reason?: string) => void;
}

const VacancyActionButtons = ({
  vacancy,
  onAction,
}: VacancyActionButtonsProps) => {
  const [selectedAction, setSelectedAction] =
    useState<EnumVacancyTrigger | null>(null);
  const [rejectedReason, setRejectedReason] = useState("");

  const handleShowModal = (action: EnumVacancyTrigger) => {
    setSelectedAction(action);
    setRejectedReason("");
    const modalElement = document.getElementById("confirmActionModal");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      document.body.classList.add("modal-open");
    }
  };

  const handleCloseModal = () => {
    const modalElement = document.getElementById("confirmActionModal");

    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  };

  const handleConfirmAction = async () => {
    if (selectedAction == null) return;
    await onAction(selectedAction, rejectedReason);
    handleCloseModal();
  };

  const getButtonActions = () => {
    switch (vacancy.status) {
      case EnumVacancyStatus.PendingReview:
        return (
          <>
            <button
              className="btn btn-sm btn-success me-2"
              onClick={() => handleShowModal(EnumVacancyTrigger.Approve)}
            >
              <FaCheck /> Aprobar
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleShowModal(EnumVacancyTrigger.Reject)}
            >
              <FaTimes /> Rechazar
            </button>
          </>
        );

      case EnumVacancyStatus.Approved:
        return (
          <>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleShowModal(EnumVacancyTrigger.Publish)}
            >
              <FaCloudUploadAlt /> Publicar
            </button>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => handleShowModal(EnumVacancyTrigger.Expire)}
            >
              <FaRegClock /> Expirar
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleShowModal(EnumVacancyTrigger.Close)}
            >
              <FaLock /> Cerrar
            </button>
          </>
        );

      case EnumVacancyStatus.Rejected:
        return (
          <button
            className="btn btn-sm btn-info"
            onClick={() => handleShowModal(EnumVacancyTrigger.ReviewAgain)}
          >
            <FaUndo /> Revisar nuevamente
          </button>
        );

      case EnumVacancyStatus.Published:
        return (
          <>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => handleShowModal(EnumVacancyTrigger.Expire)}
            >
              <FaRegClock /> Expirar
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleShowModal(EnumVacancyTrigger.Close)}
            >
              <FaLock /> Cerrar
            </button>
          </>
        );

      case EnumVacancyStatus.Expired:
        return (
          <button
            className="btn btn-sm btn-info"
            onClick={() => handleShowModal(EnumVacancyTrigger.ReviewAgain)}
          >
            <FaUndo /> Revisar nuevamente
          </button>
        );

      case EnumVacancyStatus.Closed:
        return (
          <button
            className="btn btn-sm btn-success"
            onClick={() => handleShowModal(EnumVacancyTrigger.Reopen)}
          >
            <FaRedo /> Reabrir
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end">{getButtonActions()}</div>

      {/* Modal de confirmación con Bootstrap puro */}
      <div
        className="modal fade"
        id="confirmActionModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Acción</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              />
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas realizar esta acción?</p>
              {selectedAction === EnumVacancyTrigger.Reject && (
                <div>
                  <label>Motivo del rechazo:</label>
                  <textarea
                    className="form-control"
                    value={rejectedReason}
                    onChange={(e) => setRejectedReason(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmAction}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VacancyActionButtons;
