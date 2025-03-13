"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Notification,
  NotificationType,
  getIconByType,
} from "@/types/Notification";
import { NotificationList } from "@/components/NotificacionList";

interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    title: string,
    message: string
  ) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
  notifications: [],
});

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    type: NotificationType,
    title: string,
    message: string
  ) => {
    const id = crypto.randomUUID();
    const icon = getIconByType(type);

    setNotifications((prev) => [...prev, { id, type, title, message, icon }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notifications }}>
      {notifications.length > 0 && (
        <NotificationList
          notifications={notifications}
          removeNotification={removeNotification}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para usar el contexto
export const useNotification = () => useContext(NotificationContext);
