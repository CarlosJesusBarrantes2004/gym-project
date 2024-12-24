import { Form } from "./Form";
import { FormField } from "./FormField";
import useMembership from "../hooks/useMembership";
import { Button } from "./Button";

export const SearchMembershipForm = ({
  searchMembershipForm,
  setMembership,
  setSearchPerformed,
  setShowEdit,
  updateMembershipForm,
}) => {
  const { getMembership } = useMembership();

  const onSubmit = async (values) => {
    const result = await getMembership(values.dni);
    if (result) {
      setMembership(result);
      setSearchPerformed(true);
      setShowEdit(false);
      updateMembershipForm.reset(result);
    } else {
      setMembership(null);
      setSearchPerformed(true);
      setShowEdit(false);
    }
  };

  return (
    <Form
      form={searchMembershipForm}
      onSubmit={onSubmit}
      style="flex flex-col gap-3 lg:justify-between lg:flex-row lg:items-center"
    >
      <FormField
        form={searchMembershipForm}
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
      <div className="flex justify-center">
        <Button text={"Buscar"} style={"w-full"}></Button>
      </div>
    </Form>
  );
};
