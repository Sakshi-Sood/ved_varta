const Button = ({ text, icon, fill, right, fullWidth }) => {
  return (
    <button
      className={`flex items-center justify-center font-bold px-4 py-2 rounded-lg cursor-pointer border-2 border-amber-500 ${
        fullWidth ? "w-full" : ""
      } ${
        fill
          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500"
          : " text-amber-600 hover:bg-amber-100"
      } transition-colors duration-300`}
    >
      {icon && !right && <span className="mr-2">{icon}</span>}
      {text}
      {icon && right && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
