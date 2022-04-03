import { MouseEventHandler } from "react";
import "./inputs.css";

interface primaryButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label: string;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton = ({ label, type, onClick }: primaryButtonProps) => {
  return (
    <button
      className="primary-button"
      type={type || "button"}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
