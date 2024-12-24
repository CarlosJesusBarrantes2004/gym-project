import { NavLink } from "react-router-dom";
import useUser from "../hooks/useUser";

export const Sidebar = ({ showMobileSidebar, setShowMobileSidebar }) => {
  const { user, signout } = useUser();

  const handleLinkClick = () => setShowMobileSidebar(false);

  return (
    <>
      {/**Sidebar para pantallas grandes */}
      <div className="min-h-screen hidden lg:flex flex-col bg-gradient-to-b from-[#EDFF2A] to-black justify-between">
        {/**Menú superior */}
        <div className="p-4">
          <h2 className="text-sm md:text-2xl text-center">
            Hola <span className="font-bold">{user.username}</span>!
          </h2>
        </div>
        {/**Menú de opciones */}
        <div className="flex flex-col text-gray-100">
          <NavLink
            to={"/matriculas"}
            className={({ isActive }) =>
              `p-4 text-center lg:text-sm ${isActive ? "bg-[#2E3106]" : ""}`
            }
          >
            Ver matrículas
          </NavLink>
          <NavLink
            to={"/nueva-matricula"}
            className={({ isActive }) =>
              `p-4 text-center lg:text-sm ${isActive ? "bg-[#2E3106]" : ""}`
            }
          >
            Nueva matrícula
          </NavLink>
          <NavLink
            to={"/buscar-cliente"}
            className={({ isActive }) =>
              `p-4 text-center lg:text-sm ${isActive ? "bg-[#2E3106]" : ""}`
            }
          >
            Buscar cliente
          </NavLink>
          <button
            onClick={() => signout()}
            className="lg:text-sm bg-[#50560E] rounded-full mx-auto px-4 py-4 mt-8"
          >
            Cerrar sesión
          </button>
        </div>
        {/**Logo */}
        <div className="w-full flex justify-center">
          <div className="w-32 md:w-60 lg:w-72">
            <img
              src="/logo.png"
              alt="Logo The Jungle Fitness"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/**Sidebar para móviles */}
      <div
        className={`xl:hidden fixed inset-0 z-10 transform transition-transform duration-300 ease-in-out ${
          showMobileSidebar ? "translate-x-0" : "-translate-x-full"
        } bg-gradient-to-b from-[#EDFF2A] to-black flex flex-col justify-between`}
      >
        {/**Menú superior */}
        <div className="p-4 mt-4 sm:mt-8">
          <h2 className="text-xl sm:text-4xl text-center">
            Hola <span className="font-bold">{user.username}</span>!
          </h2>
        </div>
        {/**Menú de opciones */}
        <div className="flex flex-col text-gray-100">
          <NavLink
            to={"/matriculas"}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `p-4 text-sm sm:text-xl text-center ${
                isActive ? "bg-[#2E3106]" : ""
              }`
            }
          >
            Ver matrículas
          </NavLink>
          <NavLink
            to={"/nueva-matricula"}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `p-4 text-sm sm:text-xl text-center ${
                isActive ? "bg-[#2E3106]" : ""
              }`
            }
          >
            Nueva matrícula
          </NavLink>
          <NavLink
            to={"/buscar-cliente"}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `p-4 text-sm sm:text-xl text-center ${
                isActive ? "bg-[#2E3106]" : ""
              }`
            }
          >
            Buscar cliente
          </NavLink>
          <button
            onClick={() => {
              signout();
              handleLinkClick();
            }}
            className="bg-[#50560E] text-sm sm:text-xl rounded-full mx-auto px-4 py-4 mt-8"
          >
            Cerrar sesión
          </button>
        </div>
        {/**Logo */}
        <div className="w-full flex justify-center">
          <div className="w-52 sm:w-80 md:w-96">
            <img
              src="/logo.png"
              alt="Logo The Jungle Fitness"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};
