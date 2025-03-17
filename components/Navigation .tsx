import Link from "next/link";

const Navigation = () => {
  return (
    <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
      <li>
        <Link
          href="/vacancies"
          className="text-gray-900 dark:text-white hover:text-blue-600"
        >
          Vacantes
        </Link>
      </li>
      <li>
        <Link
          href="/vacancies/mine/publish"
          className="text-gray-900 dark:text-white hover:text-blue-600"
        >
          Publicar Vacante
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
