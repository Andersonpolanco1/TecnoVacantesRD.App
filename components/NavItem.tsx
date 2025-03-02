import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <li className="nav-item">
      <Link
        className={`nav-link ${isActive ? "active" : ""}`}
        href={href}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
