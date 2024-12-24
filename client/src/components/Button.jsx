export const Button = ({ text, style }) => {
  return (
    <button
      type="submit"
      className={`text-xs sm:text-xl uppercase ${style} bg-[#EDFF2A] text-white font-bold px-2 py-2 rounded-md hover:bg-[#d0e025] transition-colors duration-200`}
    >
      {text}
    </button>
  );
};
