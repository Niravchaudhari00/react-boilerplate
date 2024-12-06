import React, { FC } from "react";
import { cn } from "../utils/twMerger";
type ButtonProps = {
  onClick: () => void;
  label: string;
  className: string;
  icon: React.ReactNode;
};
const Button: FC<ButtonProps> = ({ onClick, label, icon, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn("w-full flex items-center justify-center py-2 px-4  text-white rounded-lg shadow-md", className)}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
