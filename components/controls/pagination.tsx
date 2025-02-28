import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPagesCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPagesCount,
  onPageChange,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPagesCount;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPagesCount) {
      onPageChange(page);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => handlePageChange(1)}
        disabled={isFirstPage}
        aria-label="First Page"
      >
        Primera
      </button>

      {/* Botón "Anterior" */}
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous Page"
      >
        Anterior
      </button>

      {/* Mostrar la página actual */}
      <span>
        {currentPage} de {totalPagesCount}
      </span>

      {/* Botón "Siguiente" */}
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next Page"
      >
        Siguiente
      </button>

      {/* Botón "Último" */}
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => handlePageChange(totalPagesCount)}
        disabled={isLastPage}
        aria-label="Last Page"
      >
        Ultima
      </button>
    </div>
  );
};

export default Pagination;
