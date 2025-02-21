import { Vacancy } from "@/types/vacancy";

interface VacancyDetailsProps {
  vacancy: Vacancy;
}

const VacancyDetails = ({ vacancy }: VacancyDetailsProps) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="text-primary fw-bold">{vacancy.title}</h5>
        <p className="text-muted">
          <i className="bi bi-calendar-check"></i> Publicado:{" "}
          <span className="fw-semibold">
            {new Date(vacancy.publishDate).toLocaleDateString()}
          </span>
        </p>
        <hr />

        <div className="d-flex flex-wrap gap-3">
          <span className="badge bg-info text-dark">
            <i className="bi bi-tags"></i> {vacancy.categoryName}
          </span>

          <span className="text-success fw-bold">
            <i className="bi bi-cash-stack"></i>{" "}
            {vacancy.salary ? `$${vacancy.salary}` : "No especificado"}
          </span>

          <span className="text-secondary">
            <i className="bi bi-geo-alt"></i> {vacancy.location}
          </span>
        </div>

        <hr />

        <p>
          <i className="bi bi-hourglass-bottom text-danger"></i>{" "}
          <strong>Fecha de cierre:</strong>{" "}
          <span className="fw-semibold text-danger">
            {new Date(vacancy.closeDate).toLocaleDateString()}
          </span>
        </p>

        <div className="card p-3 bg-light border-0">
          <h5 className="fw-bold">Descripción</h5>
          <p className="text-muted">{vacancy.vacancyDescription}</p>
        </div>

        <div className="mt-4 text-end">
          <a href="#" className="btn btn-primary">
            <i className="bi bi-send"></i> Postularme
          </a>
        </div>
      </div>
    </div>
  );
};

export default VacancyDetails;
