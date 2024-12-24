import { useEffect, useState } from "react";
import { Filters, Loading, MembershipRow, Title } from "../components";
import useMembership from "../hooks/useMembership";

export const MembershipsPage = () => {
  const [currentStatus, setCurrentStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { memberships, getMemberships, meta, loading } = useMembership();

  useEffect(() => {
    getMemberships({ page: currentPage, status: currentStatus });
  }, [currentPage, currentStatus]);

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < meta.totalPages) setCurrentPage(currentPage + 1);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (!memberships || memberships.length === 0) {
      return (
        <p className="text-xs sm:text-base mt-4 text-center">
          Actualmente no hay ninguna matrícula registrada.
        </p>
      );
    }

    return (
      <>
        {/**Tabla de matriculas */}
        <div className="relative overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-center rtl:text-right text-black">
            <thead className="uppercase font-semibold text-xs md:text-lg lg:text-xs">
              <tr>
                <th scope="col" className="px-6 py-2">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-2">
                  DNI
                </th>
                <th scope="col" className="px-6 py-2">
                  Fecha Inicio
                </th>
                <th scope="col" className="px-6 py-2">
                  Fecha Fin
                </th>
                <th scope="col" className="px-6 py-2">
                  Celular
                </th>
                <th scope="col" className="px-6 py-2">
                  Status
                </th>
                <th scope="col" className="px-6 py-2">
                  Precio
                </th>
                <th scope="col" className="px-6 py-2">
                  Accion
                </th>
              </tr>
            </thead>
            <tbody className="font-medium text-center text-xs md:text-lg lg:text-xs">
              {/**Iteramos sobre las matriculas */}
              {memberships.map((membership) => (
                <MembershipRow
                  key={membership.id}
                  membership={membership}
                ></MembershipRow>
              ))}
            </tbody>
          </table>
        </div>
        {/**Paginación */}
        <div className="flex items-center gap-2 mt-6 justify-center flex-wrap">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`text-xs px-4 py-2 sm:text-sm md:text-lg lg:text-sm ${
              currentPage === 1 ? "text-gray-400" : "text-black hover:underline"
            }`}
          >
            Anterior
          </button>
          <div className="flex gap-2 items-center">
            {[...Array(meta.totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-full text-xs md:text-lg lg:text-sm ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === meta.totalPages}
            className={`text-xs px-4 py-2 sm:text-sm md:text-lg lg:text-sm ${
              currentPage === meta.totalPages
                ? "text-gray-400"
                : "text-black hover:underline"
            }`}
          >
            Siguiente
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {/**Titulo de la página */}
      <Title text={"Mira las matrículas"}></Title>
      {/**Filtros y contenido */}
      <Filters
        currentStatus={currentStatus}
        handleStatusChange={handleStatusChange}
      ></Filters>
      {renderContent()}
    </>
  );
};
