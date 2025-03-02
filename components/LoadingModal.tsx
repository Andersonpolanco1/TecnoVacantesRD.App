import React from "react";

const LoadingModal = () => {
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-body text-center">
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="spinner-border spinner-border-sm text-primary me-2"
                role="status"
              ></div>
              <div>Espere...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
