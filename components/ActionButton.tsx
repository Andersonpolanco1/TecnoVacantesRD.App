"use client";

import { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  action: () => void;
  className: string;
}
const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  action,
  className,
}) => (
  <button
    className={`px-4 py-2 text-sm ${className} rounded-lg flex items-center space-x-2 focus:outline-none hover:bg-opacity-80`}
    onClick={action}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default ActionButton;
