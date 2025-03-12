import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import sanitizeHtml from "sanitize-html";

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
export const renderHTML = (content?: string) => {
  if (!content) return null;
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe"]),
    allowedAttributes: {
      "*": ["style", "class"],
      a: ["href"],
      img: ["src", "alt"],
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
