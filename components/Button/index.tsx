import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  IconPoistion,
} from "../../types/index";

const Button = ({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  title,
  icon,
  backgroundColor,
  color,
  iconPosition = IconPoistion.RIGHT,
  onClick,
  disabled = false,
}: ButtonType) => {
  // Define base button classes
  let buttonClasses: string = "";
  let iconClasses: string = "";
  switch (variant) {
    case ButtonVariant.PRIMARY:
      buttonClasses =
        "flex justify-center items-center bg-red gap-2 text-white hover:opacity-70 transition-opacity";
      break;
    case ButtonVariant.SECONDARY:
      buttonClasses =
        "flex justify-center items-center gap-2 bg-black text-white hover:opacity-70 transition-opacity";
      break;
    case ButtonVariant.OUTLINE:
      buttonClasses =
        "flex justify-center items-center border border-gray-400 gap-2 hover:opacity-70 transition-opacity";
      break;
    case ButtonVariant.DISABLED:
      buttonClasses =
        "flex justify-center items-center bg-lightGray gap-2 text-white transition-opacity";
      break;
    case ButtonVariant.LINK:
      buttonClasses =
        "flex justify-center items-center gap-2 hover:opacity-70 transition-opacity";
      break;
    default:
      break;
  }

  // Handle different sizes if needed
  switch (size) {
    case ButtonSize.SMALL:
      buttonClasses += " px-2 py-1";
      iconClasses += " text-sm w-4";
      break;
    case ButtonSize.LARGE:
      buttonClasses += " py-4 px-8";
      iconClasses += " text-xl w-5";
      break;
    default:
      buttonClasses += " px-4 py-2";
      iconClasses += " text-base w-4";
      break;
  }

  if (variant === ButtonVariant.LINK)
    return (
      <button
        onClick={onClick}
        className={`${buttonClasses}`}
        style={{ backgroundColor, color }}
        data-testid="custom-button"
      >
        {iconPosition === IconPoistion.LEFT && icon && (
          <FontAwesomeIcon icon={icon} className={iconClasses} />
        )}
        <p className="title">{title}</p>
        {iconPosition === IconPoistion.RIGHT && icon && (
          <FontAwesomeIcon icon={icon} className={iconClasses} />
        )}
      </button>
    );
  if (disabled === true) {
    buttonClasses += " !bg-lightGray cursor-not-allowed";
  }
  return (
    <button
      className={buttonClasses}
      style={{ backgroundColor, color }}
      onClick={onClick}
      data-testid="custom-button"
      disabled={disabled}
    >
      {iconPosition === IconPoistion.LEFT && icon && (
        <FontAwesomeIcon icon={icon} className={iconClasses} />
      )}
      {size === "large" ? (
        <p className="title">{title}</p>
      ) : (
        <p className="label">{title}</p>
      )}
      {iconPosition === IconPoistion.RIGHT && icon && (
        <FontAwesomeIcon icon={icon} className={iconClasses} />
      )}
    </button>
  );
};

export default Button;
