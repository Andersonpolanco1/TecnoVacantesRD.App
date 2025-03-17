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
    <div className="flex justify-center items-center gap-2">
      {/* Ocultar el botón "Primera Página" si es la primera página */}
      {!isFirstPage && (
        <Link href={`?currentPage=1`} passHref>
          <button
            className="px-3 py-1 border border-gray-300 rounded-sm text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-label="First Page"
          >
            <FaAngleDoubleLeft />
          </button>
        </Link>
      )}

      {/* Ocultar el botón "Anterior" si es la primera página */}
      {!isFirstPage && (
        <Link href={`?currentPage=${currentPage - 1}`} passHref>
          <button
            className="px-3 py-1 border border-gray-300 rounded-sm text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-label="Previous Page"
          >
            <FaAngleLeft />
          </button>
        </Link>
      )}

      {/* Mostrar la página actual */}
      <span className="text-sm text-gray-700">
        {currentPage} de {totalPagesCount}
      </span>

      {/* Ocultar el botón "Siguiente" si es la última página */}
      {!isLastPage && (
        <Link href={`?currentPage=${currentPage + 1}`} passHref>
          <button
            className="px-3 py-1 border border-gray-300 rounded-sm text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-label="Next Page"
          >
            <FaAngleRight />
          </button>
        </Link>
      )}

      {/* Ocultar el botón "Última Página" si es la última página */}
      {!isLastPage && (
        <Link href={`?currentPage=${totalPagesCount}`} passHref>
          <button
            className="px-3 py-1 border border-gray-300 rounded-sm text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
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
