const Button = ({ text, icon, fill, right, fullWidth, className = "", type = "button", disabled = false, onClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center font-semibold px-4 py-2 rounded-lg cursor-pointer border-2 border-amber-500 ${fullWidth ? "w-full" : ""
        } ${fill
          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500"
          : " text-amber-600 hover:bg-amber-100"
        } transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {icon && !right && <span className="mr-2">{icon}</span>}
      {text}
      {icon && right && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;