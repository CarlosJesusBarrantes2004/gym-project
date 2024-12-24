import { LoginForm } from "../components";

export const LoginPage = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-b from-[#EDFF2A] to-black">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-52 sm:w-64 md:w-72 xl:w-96">
          <img
            src="/logo.png"
            alt="Logo The Jungle Fitness"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#CECECE] px-6 py-5 rounded-md md:rounded-3xl sm:px-4 sm:py-10 md:px-8 md:py-16 flex flex-col justify-center bg-opacity-65">
          <h1 className="text-xl md:text-3xl xl:text-4xl text-center mb-4 font-bold">
            INICIAR SESION
          </h1>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};
