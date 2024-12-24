export const Filters = ({ currentStatus, handleStatusChange }) => {
  return (
    <div className="flex justify-center gap-2 my-4 text-xs sm:text-sm md:text-lg lg:text-sm">
      <button
        className={`rounded-full px-3 py-2 ${
          currentStatus === "all"
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => handleStatusChange("all")}
      >
        Todas
      </button>
      <button
        className={`rounded-full px-3 py-2 ${
          currentStatus === "expiring"
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => handleStatusChange("expiring")}
      >
        Por vencer
      </button>
      <button
        className={`rounded-full px-3 py-2 ${
          currentStatus === "active"
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => handleStatusChange("active")}
      >
        Activas
      </button>
      <button
        className={`rounded-full px-3 py-2 ${
          currentStatus === "expired"
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => handleStatusChange("expired")}
      >
        Vencidas
      </button>
    </div>
  );
};
