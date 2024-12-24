import { useForm } from "react-hook-form";
import { Form } from "./Form";
import useMembership from "../hooks/useMembership";
import { FormField } from "./FormField";
import { Button } from "./Button";

export const CreateMembershipForm = () => {
  const createMembershipForm = useForm({
    defaultValues: {
      name: "",
      phone: "",
      dni: "",
      payment: "",
      startDate: "",
      endDate: "",
    },
    mode: "onSubmit",
  });

  const { createMembership } = useMembership();

  const onSubmit = async (values) => {
    try {
      await createMembership({ ...values, payment: Number(values.payment) });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      form={createMembershipForm}
      onSubmit={onSubmit}
      style="rounded-lg shadow-lg py-8 px-2 space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-4">
        <FormField
          form={createMembershipForm}
          id={"name"}
          label={"Nombre"}
          validation={{
            required: "El nombre es obligatorio",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
            },
          }}
        ></FormField>
        <FormField
          form={createMembershipForm}
          id={"phone"}
          label={"Celular"}
          validation={{
            required: "El número de celular es obligatorio",
            pattern: {
              value: /^9\d{8}$/,
              message: "El número debe empezar con 9 y tener 9 dígitos",
            },
          }}
        ></FormField>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-4">
        <FormField
          form={createMembershipForm}
          id={"dni"}
          label={"DNI"}
          validation={{
            required: "El dni es obligatorio",
            pattern: {
              value: /^[0-9]{8}$/,
              message: "Ingrese un número de DNI válido",
            },
          }}
        ></FormField>
        <FormField
          form={createMembershipForm}
          id={"payment"}
          label={"Pago"}
          type="number"
          validation={{
            required: "El pago es obligatorio",
            min: {
              value: 1,
              message: "El pago debe ser mayor a 0",
            },
          }}
        ></FormField>
      </div>
      <div className="flex justify-between mt-2 gap-2">
        <FormField
          form={createMembershipForm}
          id={"startDate"}
          label={"Fecha de inicio"}
          type="date"
          validation={{
            required: "La fecha de inicio es obligatoria",
          }}
        ></FormField>
        <FormField
          form={createMembershipForm}
          id={"endDate"}
          label={"Fecha de fin"}
          type="date"
          validation={{
            required: "La fecha de fin es obligatoria",
          }}
        ></FormField>
      </div>
      <div className="mt-6 flex justify-center">
        <Button text={"Crear"} style={"w-5/6 lg:w-1/3"}></Button>
      </div>
    </Form>
  );
};
