"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const GoBackButton = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="container my-3">
      <button onClick={handleBackClick} className="btn btn-light">
        <FaArrowLeft /> Volver Atrás
      </button>
    </div>
  );
};

export default GoBackButton;
