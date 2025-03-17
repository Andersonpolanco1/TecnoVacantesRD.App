interface VacancyDescriptionModalProps {
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
}: VacancyDescriptionModalProps) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VacancyDescriptionModal;
