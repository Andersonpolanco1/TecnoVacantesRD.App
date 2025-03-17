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

  return isOpen ? (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold">Confirmar Acción</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <p>{actionDescription}</p>
          {showReasonInput && (
            <div className="mt-4">
              <label
                htmlFor="reasonInput"
                className="block text-sm font-medium text-gray-700"
              >
                Motivo del rechazo:
              </label>
              <textarea
                id="reasonInput"
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={rejectedReason}
                onChange={(e) => setRejectedReason(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmModal;
