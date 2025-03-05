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
      style={{ zIndex: 100000 }}
      className={`btn btn-primary position-fixed shadow-lg rounded-circle top-50 end-0 translate-middle-y ${
        isMobile ? "me-2" : "me-5"
      } ${isVisible ? "d-block" : "d-none"}`}
    >
      <FaArrowUp size={isMobile ? 20 : 30} />
    </button>
  );
};

export default ScrollToUpButton;
