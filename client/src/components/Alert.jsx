import useMessage from "../hooks/useMessage";

export const Alert = ({ message, type }) => {
  const { errors, setErrors, successes, setSuccesses } = useMessage();

  const getAlertStyle = () => {
    switch (type) {
      case "success":
        return "alert alert-success";
      case "warning":
        return "alert alert-warning";
      case "error":
        return "alert alert-error";
      default:
        return "alert alert-any";
    }
  };

  return (
    <div className={getAlertStyle()}>
      <span>{message}</span>{" "}
      <div>
        <button
          className="rounded-sm p-1"
          onClick={() => {
            if (errors) setErrors(null);
            if (successes) setSuccesses(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
