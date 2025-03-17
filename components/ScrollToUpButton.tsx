"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 600);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      title="Go up"
      onClick={scrollToTop}
      className={`fixed z-50 shadow-lg rounded-full ${
        isMobile ? "right-2" : "right-5"
      } bottom-1/2 transform -translate-y-1/2 ${
        isVisible ? "block" : "hidden"
      } p-3 bg-blue-600 text-white hover:bg-blue-800 transition-all duration-300`}
    >
      <FaArrowUp size={isMobile ? 20 : 30} />
    </button>
  );
};

export default ScrollToUpButton;
