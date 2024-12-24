import { useForm } from "react-hook-form";
import { Form } from "./Form";
import { FormField } from "./FormField";
import useUser from "../hooks/useUser";

export const LoginForm = () => {
  const loginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { signin } = useUser();

  const onSubmit = async (values) => {
    try {
      await signin(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={loginForm} onSubmit={onSubmit} style="flex flex-col gap-3">
      <FormField
        form={loginForm}
        id={"username"}
        label={"Usuario"}
        validation={{
          required: "El campo de usuario es requerido",
        }}
      ></FormField>
      <FormField
        form={loginForm}
        id={"password"}
        label={"Contraseña"}
        type="password"
        validation={{
          required: "El campo de la contraseña es requerido",
        }}
      ></FormField>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[#50560E] rounded-full px-6 py-4 text-white text-lg md:text-xl xl:text-3xl font-bold"
        >
          Iniciar sesión
        </button>
      </div>
    </Form>
  );
};
