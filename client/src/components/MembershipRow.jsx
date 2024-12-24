import { useLocation, useNavigate } from "react-router-dom";
import { FaRegEdit, FaWhatsappSquare } from "react-icons/fa";

export const MembershipRow = ({ membership, onEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname.includes("buscar-cliente");

  const getMembershipStatus = () => {
    const currentDate = new Date();
    const endDate = new Date(membership.endDate);
    const diffTime = endDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (currentDate > endDate) {
      return {
        text: "Vencido",
        className:
          "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs sm:text-sm lg:text-xs font-semibold",
      };
    }

    if (diffDays <= 3) {
      return {
        text: "Por vencer",
        className:
          "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs sm:text-sm lg:text-xs font-semibold",
      };
    }

    return {
      text: "Activo",
      className:
        "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm lg:text-xs font-semibold",
    };
  };

  const status = getMembershipStatus();

  const handleWhatsAppClick = (phone, memberName, status) => {
    const cleanPhone = phone.replace(/\D/g, "");

    let message = `Hola ${memberName}`;

    switch (status.text) {
      case "Vencido":
        message +=
          ", te informamos que tu membresía del gimnasio ha vencido. ¿Te gustaría renovarla?";
        break;
      case "Por vencer":
        message +=
          ", te recordamos que tu membresía del gimnasio está por vencer. ¿Te gustaría renovarla?";
        break;
      case "Activo":
        message +=
          ", ¿cómo va tu experiencia en el gimnasio? Estamos para ayudarte.";
        break;
      default:
        message += ", te escribimos del gimnasio.";
    }

    const whatsappUrl = `https://wa.me/51${cleanPhone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    if (isSearchPage) onEdit?.(membership);
    else navigate(`/buscar-cliente/${membership.dni}`);
  };

  return (
    <tr className="bg-[#F7F6FE] h-12">
      <th scope="row" className="px-6 py-2">
        {membership.name}
      </th>
      <td className="px-6 py-2">{membership.dni}</td>
      <td className="px-6 py-2">{membership.startDate}</td>
      <td className="px-6 py-2">{membership.endDate}</td>
      <td className="px-6 py-2">{membership.phone}</td>
      <td className="px-6 py-2">
        {<span className={status.className}>{status.text}</span>}
      </td>
      <td className="px-6 py-2">{membership.payment}</td>
      <td className="px-6 py-2 gap-2 flex justify-center items-center">
        <button onClick={handleEditClick}>
          <FaRegEdit
            className="text-purple-700 cursor-pointer"
            size={24}
          ></FaRegEdit>
        </button>
        <button
          onClick={() =>
            handleWhatsAppClick(membership.phone, membership.name, status)
          }
          title="Enviar mensaje de WhatsApp"
        >
          <FaWhatsappSquare
            className="text-green-500 bg-white cursor-pointer"
            size={24}
          ></FaWhatsappSquare>
        </button>
      </td>
    </tr>
  );
};
