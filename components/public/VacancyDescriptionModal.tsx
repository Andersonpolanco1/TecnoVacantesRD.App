"use client";

import { renderHTML } from "@/lib/utilsX";
import RichText from "./RichText";

interface VacancyModalProps {
  title: string;
  description: string;
  show: boolean;
  onClose: () => void;
}

const VacancyDescriptionModal = ({
  title,
  description,
  show,
  onClose,
}: VacancyModalProps) => {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        tabIndex={-1}
        style={{ display: "block", zIndex: 100001 }}
        aria-labelledby="vacancyModalLabel"
        aria-hidden={!show ? "true" : "false"}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-break" id="vacancyModalLabel">
                {title}
              </h5>
            </div>
            <div className="modal-body">{renderHTML(description)}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fondo oscuro del modal */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default VacancyDescriptionModal;
