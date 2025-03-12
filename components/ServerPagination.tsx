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
      {/* Botón "Primera Página" */}
      <Link href={`?page=1`} passHref>
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={isFirstPage}
          aria-label="First Page"
        >
          <FaAngleDoubleLeft />
        </button>
      </Link>

      {/* Botón "Anterior" */}
      <Link href={`?page=${currentPage - 1}`} passHref>
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={isFirstPage}
          aria-label="Previous Page"
        >
          <FaAngleLeft />
        </button>
      </Link>

      {/* Mostrar la página actual */}
      <span>
        {currentPage} de {totalPagesCount}
      </span>

      {/* Botón "Siguiente" */}
      <Link href={`?page=${currentPage + 1}`} passHref>
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={isLastPage}
          aria-label="Next Page"
        >
          <FaAngleRight />
        </button>
      </Link>

      {/* Botón "Última Página" */}
      <Link href={`?page=${totalPagesCount}`} passHref>
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={isLastPage}
          aria-label="Last Page"
        >
          <FaAngleDoubleRight />
        </button>
      </Link>
    </div>
  );
};

export default ServerPagination;
