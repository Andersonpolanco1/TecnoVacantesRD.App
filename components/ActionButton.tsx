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
  <button className={`btn btn-sm ${className}`} onClick={action}>
    {icon} {label}
  </button>
);

export default ActionButton;
