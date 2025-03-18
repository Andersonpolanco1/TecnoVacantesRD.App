import { ReactNode } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

export const NOTIFICATION_COLORS = {
  success: "text-green-600 bg-green-100 border-green-500",
  danger: "text-red-600 bg-red-100 border-red-500",
  warning: "text-yellow-600 bg-yellow-100 border-yellow-500",
  info: "text-blue-600 bg-blue-100 border-blue-500",
} as const;

export type NotificationType = keyof typeof NOTIFICATION_COLORS;

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  icon: ReactNode;
}

const iconMap: Record<NotificationType, ReactNode> = {
  success: <FaCheckCircle />,
  danger: <FaTimesCircle />,
  warning: <FaExclamationCircle />,
  info: <FaInfoCircle />,
};

export const getIconByType = (type: NotificationType) => {
  return iconMap[type] || <FaExclamationCircle />;
};
