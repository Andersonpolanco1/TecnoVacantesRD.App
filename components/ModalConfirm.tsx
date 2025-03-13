"use client";

import { useState } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  actionDescription: string;
  showReasonInput?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionDescription,
  showReasonInput = false,
}: ConfirmModalProps) => {
  const [rejectedReason, setRejectedReason] = useState("");

  const handleConfirm = () => {
    onConfirm(rejectedReason);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Acción</h5>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>
              <div className="modal-body">
                <p>{actionDescription}</p>
                {showReasonInput && (
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
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
