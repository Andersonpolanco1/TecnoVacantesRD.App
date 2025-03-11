import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import DOMPurify from "dompurify";

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
  if (typeof window === "undefined") return <div />;

  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "u",
      "strong",
      "em",
      "p",
      "ul",
      "ol",
      "li",
      "br",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
      "span",
      "a",
      "div",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "hr",
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "class",
      "style",
      "src",
      "alt",
      "width",
      "height",
      "align",
    ],
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
