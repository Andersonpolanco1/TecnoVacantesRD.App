import Link from "next/link";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPagesCount: number;
}

const ServerPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPagesCount,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPagesCount;

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      {/* Ocultar el botón "Primera Página" si es la primera página */}
      {!isFirstPage && (
        <Link href={`?page=1`} passHref>
          <button
            className="btn btn-outline-primary btn-sm"
            aria-label="First Page"
          >
            <FaAngleDoubleLeft />
          </button>
        </Link>
      )}

      {/* Ocultar el botón "Anterior" si es la primera página */}
      {!isFirstPage && (
        <Link href={`?page=${currentPage - 1}`} passHref>
          <button
            className="btn btn-outline-primary btn-sm"
            aria-label="Previous Page"
          >
            <FaAngleLeft />
          </button>
        </Link>
      )}

      {/* Mostrar la página actual */}
      <span>
        {currentPage} de {totalPagesCount}
      </span>

      {/* Ocultar el botón "Siguiente" si es la última página */}
      {!isLastPage && (
        <Link href={`?page=${currentPage + 1}`} passHref>
          <button
            className="btn btn-outline-primary btn-sm"
            aria-label="Next Page"
          >
            <FaAngleRight />
          </button>
        </Link>
      )}

      {/* Ocultar el botón "Última Página" si es la última página */}
      {!isLastPage && (
        <Link href={`?page=${totalPagesCount}`} passHref>
          <button
            className="btn btn-outline-primary btn-sm"
            aria-label="Last Page"
          >
            <FaAngleDoubleRight />
          </button>
        </Link>
      )}
    </div>
  );
};

export default ServerPagination;
