"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const GoBackButton = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div>
      <button
        onClick={handleBackClick}
        className="btn btn-sm btn-light d-flex align-items-center"
      >
        <FaArrowLeft />
        Atrás
      </button>
    </div>
  );
};

export default GoBackButton;
