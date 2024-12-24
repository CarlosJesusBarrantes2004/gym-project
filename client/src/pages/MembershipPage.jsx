import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useMembership from "../hooks/useMembership";
import {
  Loading,
  MembershipRow,
  SearchMembershipForm,
  Title,
  UpdateMembershipForm,
} from "../components";

export const MembershipPage = () => {
  const { dni } = useParams();
  const { getMembership, loading } = useMembership();
  const [membership, setMembership] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const searchMembershipForm = useForm({
    defaultValues: {
      dni: dni || "",
    },
    mode: "onSubmit",
  });

  const updateMembershipForm = useForm({
    defaultValues: {
      dni: "",
      name: "",
      phone: "",
      startDate: "",
      endDate: "",
      payment: "",
    },
    mode: "onSubmit",
  });

  const fetchMembership = async (dni) => {
    const result = await getMembership(dni);
    if (result) {
      setMembership(result);
      setSearchPerformed(true);
      setShowEdit(true);
      searchMembershipForm.reset({ dni });
      updateMembershipForm.reset(result);
    } else {
      setMembership(null);
      setShowEdit(false);
      setSearchPerformed(true);
    }
  };

  useEffect(() => {
    if (dni) fetchMembership(dni);
  }, [dni]);

  const onEdit = (membership) => {
    if (!membership) return;
    setShowEdit(true);
    updateMembershipForm.reset(membership);
  };

  return (
    <>
      {/**Título de la página */}
      <Title text={"Editar matrícula"}></Title>
      {/**Formulario de búsqueda de matrícula */}
      <SearchMembershipForm
        searchMembershipForm={searchMembershipForm}
        setMembership={setMembership}
        setSearchPerformed={setSearchPerformed}
        setShowEdit={setShowEdit}
        updateMembershipForm={updateMembershipForm}
      ></SearchMembershipForm>
      {loading ? (
        <Loading></Loading>
      ) : searchPerformed ? (
        membership ? (
          <>
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
                  <MembershipRow
                    membership={membership}
                    onEdit={onEdit}
                  ></MembershipRow>
                </tbody>
              </table>
            </div>
            {showEdit && (
              <UpdateMembershipForm
                updateMembershipForm={updateMembershipForm}
                membership={membership}
                setMembership={setMembership}
                setShowEdit={setShowEdit}
                searchMembershipForm={searchMembershipForm}
              ></UpdateMembershipForm>
            )}
          </>
        ) : (
          <div className="text-center p-4 mt-4">
            <p className="text-gray-600">
              No se encontró ninguna matrícula con ese DNI
            </p>
          </div>
        )
      ) : null}
    </>
  );
};
