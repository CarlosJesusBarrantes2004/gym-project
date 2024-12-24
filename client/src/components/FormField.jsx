export const FormField = ({ form, id, label, validation, type = "text" }) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-xs sm:text-lg font-semibold text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...form.register(id, validation)}
        className={`text-xs sm:text-lg p-2 rounded-md border ${
          form.formState.errors[id]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-[#EDFF2A] focus:ring-[#EDFF2A]"
        } shadow-sm focus:outline-none focus:ring-1`}
      />
      {form.formState.errors[id]?.message && (
        <p className="text-red-500 text-xs sm:text-base font-semibold mt-1">
          {form.formState.errors[id].message}
        </p>
      )}
    </div>
  );
};
