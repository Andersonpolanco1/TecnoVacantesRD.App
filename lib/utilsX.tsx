import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export const getStatusIcon = (status: number) => {
  switch (status) {
    case 1:
      return <FaCheckCircle className="text-success" />;
    case 2:
      return <FaTimesCircle className="text-danger" />;
    case 3:
      return <FaClock className="text-info" />;
    case 4:
      return <FaClock className="text-muted" />;
    case 5:
      return <FaTimesCircle className="text-secondary" />;
    default:
      return <FaClock className="text-warning" />;
  }
};

// Función que devuelve un componente JSX para renderizar contenido HTML
export const renderHTML = (content: string) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
