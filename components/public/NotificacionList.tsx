import React from "react";
import { Notification } from "../../types/Notification";

interface NotificationListProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationList = ({
  notifications,
  removeNotification,
}: NotificationListProps) => {
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {notifications.map(({ id, type, title, message, icon }) => (
        <div
          key={id}
          className={`alert alert-${type} d-flex align-items-center shadow-sm fade show`}
          role="alert"
        >
          <div className="me-3">{icon}</div>
          <div className="flex-grow-1">
            <strong className="d-block">{title}</strong>
            <p className="mb-0">{message}</p>
          </div>
          <button
            onClick={() => removeNotification(id)}
            className="btn-close ms-3"
            aria-label="Close"
          ></button>
        </div>
      ))}
    </div>
  );
};
