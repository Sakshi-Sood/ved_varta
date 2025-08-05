const Button = ({ text, icon, fill }) => {
  return (
    <button
      className={`flex justify-center font-bold px-4 py-2 rounded-lg cursor-pointer w-full border-2 border-amber-500 ${
        fill
          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500"
          : " text-amber-600 hover:bg-amber-100"
      } transition-colors duration-300`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
