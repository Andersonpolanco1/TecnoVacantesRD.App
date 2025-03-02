import { ReactNode } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

export const NOTIFICATION_COLORS = {
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
} as const;

export type NotificationType = keyof typeof NOTIFICATION_COLORS;

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
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
