import { CreateMembershipForm, Title } from "../components";

export const NewMembershipPage = () => {
  return (
    <>
      {/**Título de la página */}
      <Title text={"Nueva matrícula"}></Title>
      {/**Formulario de nueva matrícula */}
      <CreateMembershipForm></CreateMembershipForm>
    </>
  );
};
