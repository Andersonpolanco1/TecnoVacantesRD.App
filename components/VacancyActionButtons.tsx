"use client";

import { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
  FaLock,
  FaRegClock,
  FaUndo,
} from "react-icons/fa";
import {
  EnumVacancyStatus,
  EnumVacancyTrigger,
  getVacancyTrigger,
} from "@/lib/utils";
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
    if (selectedAction) {
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
        className: "btn-success",
      },
      {
        label: "Rechazar",
        icon: <FaTimes />,
        action: EnumVacancyTrigger.Reject,
        className: "btn-danger",
      },
    ],
    [EnumVacancyStatus.Approved]: [
      {
        label: "Publicar",
        icon: <FaCloudUploadAlt />,
        action: EnumVacancyTrigger.Publish,
        className: "btn-primary",
      },
      {
        label: "Expirar",
        icon: <FaRegClock />,
        action: EnumVacancyTrigger.Expire,
        className: "btn-warning",
      },
      {
        label: "Cerrar",
        icon: <FaLock />,
        action: EnumVacancyTrigger.Close,
        className: "btn-secondary",
      },
    ],
    [EnumVacancyStatus.Rejected]: [
      {
        label: "Revisar nuevamente",
        icon: <FaUndo />,
        action: EnumVacancyTrigger.ReviewAgain,
        className: "btn-info",
      },
    ],
    [EnumVacancyStatus.Published]: [
      {
        label: "Expirar",
        icon: <FaRegClock />,
        action: EnumVacancyTrigger.Expire,
        className: "btn-warning",
      },
      {
        label: "Cerrar",
        icon: <FaLock />,
        action: EnumVacancyTrigger.Close,
        className: "btn-secondary",
      },
    ],
    [EnumVacancyStatus.Expired]: [
      {
        label: "Revisar nuevamente",
        icon: <FaUndo />,
        action: EnumVacancyTrigger.ReviewAgain,
        className: "btn-info",
      },
    ],
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
        className={`${className} me-2`}
      />
    ));
  };

  return (
    <>
      <div className="d-flex justify-content-end">{getButtonActions()}</div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        actionDescription={`¿Estás seguro de que deseas ${getVacancyTrigger(
          selectedAction as EnumVacancyTrigger
        )} esta vacante?`}
        showReasonInput={selectedAction === EnumVacancyTrigger.Reject}
      />
    </>
  );
};

export default VacancyActionButtons;
