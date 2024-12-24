export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-black">
          Cargando
        </h2>
        <div className="flex space-x-1.5">
          <div
            className="w-2 h-2 bg-[#EDFF2A] rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-[#EDFF2A] rounded-full animate-bounce"
            style={{ animationDelay: '100ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-[#EDFF2A] rounded-full animate-bounce"
            style={{ animationDelay: '200ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};
