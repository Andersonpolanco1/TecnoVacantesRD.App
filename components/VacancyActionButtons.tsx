"use client";

import { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
  FaLock,
  FaUndo,
} from "react-icons/fa";
import {
  EnumVacancyStatus,
  EnumVacancyTrigger,
  getVacancyTrigger,
} from "@/lib/apputils";
import ConfirmModal from "./ModalConfirm";
import { VacancyUserDto } from "@/types/vacancy";
import ActionButton from "./ActionButton";

interface VacancyActionButtonsProps {
  vacancy: VacancyUserDto;
  onAction: (trigger: EnumVacancyTrigger, reason?: string) => void;
}

const VacancyActionButtons = ({
  vacancy,
  onAction,
}: VacancyActionButtonsProps) => {
  const [selectedAction, setSelectedAction] =
    useState<EnumVacancyTrigger | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = (action: EnumVacancyTrigger) => {
    setSelectedAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmAction = async (rejectedReason: string | undefined) => {
    if (selectedAction !== null && selectedAction !== undefined) {
      onAction(selectedAction, rejectedReason);
      setIsModalOpen(false);
    }
  };

  const actionButtons = {
    [EnumVacancyStatus.PendingReview]: [
      {
        label: "Aprobar",
        icon: <FaCheck />,
        action: EnumVacancyTrigger.Approve,
        className: "bg-green-600 hover:bg-green-600 text-white",
      },
      {
        label: "Rechazar",
        icon: <FaTimes />,
        action: EnumVacancyTrigger.Reject,
        className: "bg-red-600 hover:bg-red-600 text-white",
      },
    ],
    [EnumVacancyStatus.Approved]: [
      {
        label: "Publicar",
        icon: <FaCloudUploadAlt />,
        action: EnumVacancyTrigger.Publish,
        className: "bg-blue-600 hover:bg-blue-600 text-white",
      },
      {
        label: "Cerrar",
        icon: <FaLock />,
        action: EnumVacancyTrigger.Close,
        className: "bg-gray-600 hover:bg-gray-600 text-white",
      },
    ],
    [EnumVacancyStatus.Rejected]: [
      {
        label: "Revisar nuevamente",
        icon: <FaUndo />,
        action: EnumVacancyTrigger.ReviewAgain,
        className: "bg-teal-600 hover:bg-teal-600 text-white",
      },
    ],
    [EnumVacancyStatus.Published]: [
      {
        label: "Cerrar",
        icon: <FaLock />,
        action: EnumVacancyTrigger.Close,
        className: "bg-gray-600 hover:bg-gray-600 text-white",
      },
    ],
    [EnumVacancyStatus.Expired]: [],
    [EnumVacancyStatus.Closed]: [],
  };

  const getButtonActions = () => {
    const buttons = actionButtons[vacancy.status as EnumVacancyStatus] || [];
    return buttons.map(({ label, icon, action, className }, index) => (
      <ActionButton
        key={index}
        icon={icon}
        label={label}
        action={() => handleShowModal(action)}
        className={`${className} mr-2 mb-2 sm:mb-0 w-full sm:w-auto`} // Ajuste aquí para que los botones ocupen todo el ancho en pantallas pequeñas
      />
    ));
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        {" "}
        {/* Ajuste para permitir el scroll si es necesario */}
        <div className="flex flex-wrap justify-start gap-2 sm:gap-4">
          {getButtonActions()}
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        actionDescription={`¿Estás seguro de que deseas ${getVacancyTrigger(
          selectedAction as EnumVacancyTrigger
        )} esta vacante: ${vacancy.title}?`}
        showReasonInput={selectedAction === EnumVacancyTrigger.Reject}
      />
    </>
  );
};

export default VacancyActionButtons;
