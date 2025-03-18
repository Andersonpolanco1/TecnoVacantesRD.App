import React from "react";
import { Notification } from "../types/Notification";

interface NotificationListProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationList = ({
  notifications,
  removeNotification,
}: NotificationListProps) => {
  return (
    <div className="fixed top-4 right-4 space-y-3 z-[1050]">
      {notifications.map(({ id, type, title, message, icon }) => (
        <div
          key={id}
          className={`flex items-start p-4 rounded-lg shadow-md border-l-4 ${
            type === "success"
              ? "bg-green-100 text-green-800 border-green-500"
              : type === "danger"
              ? "bg-red-100 text-red-800 border-red-500"
              : type === "warning"
              ? "bg-yellow-100 text-yellow-800 border-yellow-500"
              : "bg-blue-100 text-blue-800 border-blue-500"
          }`}
          role="alert"
        >
          <div className="mr-3">{icon}</div>
          <div className="flex-1">
            <strong className="block">{title}</strong>
            <p className="m-0">{message}</p>
          </div>
          <button
            onClick={() => removeNotification(id)}
            className="ml-3 text-gray-500 hover:text-gray-700 transition"
            aria-label="Close"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};
