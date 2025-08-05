const Button = ({ text }) => {
  return (
    <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-4 py-2 rounded-lg cursor-pointer">
      {text}
    </button>
  );
};

export default Button;
