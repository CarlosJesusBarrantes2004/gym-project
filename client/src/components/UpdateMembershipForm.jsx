import { useNavigate } from "react-router-dom";
import useMembership from "../hooks/useMembership";
import { Form } from "./Form";
import { FormField } from "./FormField";
import { Button } from "./Button";

export const UpdateMembershipForm = ({
  updateMembershipForm,
  membership,
  setMembership,
  setShowEdit,
  searchMembershipForm,
}) => {
  const navigate = useNavigate();
  const { updateMembership } = useMembership();

  const onSubmit = async (values) => {
    if (!membership?.id) return;

    const result = await updateMembership(membership.id, values);
    if (result) {
      setMembership(result);
      setShowEdit(false);

      if (result.dni !== membership.dni) {
        navigate(`/buscar-cliente/${result.dni}`, { replace: true });
        searchMembershipForm.reset({ dni: result.dni });
      }
    }
  };

  return (
    <Form
      form={updateMembershipForm}
      onSubmit={onSubmit}
      style="rounded-lg shadow-lg py-8 px-2 space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-4">
        <FormField
          form={updateMembershipForm}
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
          form={updateMembershipForm}
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
          form={updateMembershipForm}
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
          form={updateMembershipForm}
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
          form={updateMembershipForm}
          id={"startDate"}
          label={"Fecha de inicio"}
          type="date"
          validation={{
            required: "La fecha de inicio es obligatoria",
          }}
        ></FormField>
        <FormField
          form={updateMembershipForm}
          id={"endDate"}
          label={"Fecha de fin"}
          type="date"
          validation={{
            required: "La fecha de fin es obligatoria",
          }}
        ></FormField>
      </div>
      <div className="mt-6 flex justify-center">
        <Button text={"Actualizar"}></Button>
      </div>
    </Form>
  );
};
