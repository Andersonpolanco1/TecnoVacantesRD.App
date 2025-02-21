import { Vacancy } from "@/types/vacancy";

interface VacancyDetailsProps {
  vacancy: Vacancy;
}

const VacancyDetails = ({ vacancy }: VacancyDetailsProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold text-primary mb-2 border-bottom pb-2">
        {vacancy.title}
      </h1>

      <p className="text-muted">
        📅 <strong>Publicado:</strong>{" "}
        <span className="text-primary">
          {new Date(vacancy.publishDate).toLocaleDateString()}
        </span>
      </p>

      <p className="mt-3">
        🎯 <strong>Categoría:</strong>{" "}
        <span className="badge bg-info text-dark">{vacancy.categoryName}</span>
      </p>

      <p className="fw-bold">
        💰 Salario:{" "}
        <span className="text-success">
          ${vacancy.salary ?? "No especificado"}
        </span>
      </p>

      <p className="text-muted">
        📍 <span className="fw-bold">{vacancy.location}</span>
      </p>

      <p className="mt-2">
        ⏳ <strong>Cierre:</strong>{" "}
        <span className="text-danger">
          {new Date(vacancy.closeDate).toLocaleDateString()}
        </span>
      </p>

      <p>
        📝 <strong>Descripción:</strong> {vacancy.vacancyDescription}
      </p>
    </div>
  );
};

export default VacancyDetails;
