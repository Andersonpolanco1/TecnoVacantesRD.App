import { useState } from "react";
import NavItem from "./NavItem";

const navLinks = [
  { href: "/", label: "Welcome" },
  { href: "/vacancies", label: "Vacantes" },
  { href: "/about", label: "Sobre Nosotros" },
  { href: "/post-job", label: "Publicar Vacante" },
];

const Navigation = () => {
  const [activeLink, setActiveLink] = useState<string>(navLinks[0].href);

  const handleClick = (href: string) => {
    setActiveLink(href);
  };

  return (
    <>
      {navLinks.map((link) => (
        <NavItem
          key={link.href}
          {...link}
          isActive={link.href === activeLink}
          onClick={() => handleClick(link.href)}
        />
      ))}
    </>
  );
};

export default Navigation;
