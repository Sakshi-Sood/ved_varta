import Link from "next/link";

const Button = ({
  text,
  icon,
  fill,
  right,
  fullWidth,
  className = "",
  type = "button",
  disabled = false,
  onClick,
  href,
}) => {
  const buttonContent = (
    <>
      <span className="btn-animated-bg" />
      <span className="btn-shimmer" />
      <span className="btn-content relative z-10 flex items-center justify-center">
        {icon && !right && (
          <span className={`${text ? "mr-2" : ""} btn-icon`}>{icon}</span>
        )}
        {text}
        {icon && right && (
          <span className={`${text ? "ml-2" : ""} btn-icon`}>{icon}</span>
        )}
      </span>
    </>
  );

  const baseClasses = `btn-animated relative flex items-center justify-center font-semibold px-7 py-3 rounded-full cursor-pointer overflow-hidden ${
    fullWidth ? "w-full" : ""
  } ${
    fill
      ? "text-white border-0"
      : "border-2 border-amber-500 text-amber-600 hover:text-white"
  } transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  // If href is provided, render as a link
  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:");
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={baseClasses}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
