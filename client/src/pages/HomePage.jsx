import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Alert } from "../components";
import useMessage from "../hooks/useMessage";

export const HomePage = () => {
  const location = useLocation();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { errors, successes } = useMessage();

  return (
    <div className="min-h-screen flex relative">
      {errors && <Alert type={"error"} message={errors}></Alert>}
      {successes && <Alert type={"success"} message={successes}></Alert>}
      {/**Botón de Menú*/}
      <div
        className={`absolute top-2 left-2 p-2 text-lg sm:text-xl sm:p-3 sm:top-4 sm:left-4 md:text-2xl lg:hidden z-20 ${
          showMobileSidebar ? "bg-[#2E3106] text-white" : "bg-[#EDFF2A]"
        } rounded-full cursor-pointer`}
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
      >
        {showMobileSidebar ? (
          <IoMdClose className="font-bold"></IoMdClose>
        ) : (
          <IoMdMenu className="font-bold"></IoMdMenu>
        )}
      </div>
      {/**Sidebar para pantallas grandes o pequeñas */}
      <Sidebar
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
      ></Sidebar>
      {/**Contenido de la página */}
      <div className="py-14 px-2 flex-grow overflow-x-auto">
        {location.pathname === "/" ? (
          <p className="text-sm sm:text-lg text-center">
            Sistema para la administración de tu sistema.
          </p>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </div>
  );
};
