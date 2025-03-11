"use client";

import { useState } from "react";
import NavItem from "./NavItem";

const navLinks = [
  { href: "/vacancies", label: "Vacantes" },
  { href: "/vacancies/mine/publish", label: "Publicar Vacante" },
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
