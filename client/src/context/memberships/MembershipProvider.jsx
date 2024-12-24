import { useState } from "react";
import { MembershipContext } from "./MembershipContext";
import {
  getMembershipsRequest,
  createMembershipRequest,
  getMembershipRequest,
  updateMembershipRequest,
} from "../../api/membership";
import { useNavigate } from "react-router-dom";
import useMessage from "../../hooks/useMessage";

const MembershipProvider = ({ children }) => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });
  const navigate = useNavigate();
  const { setErrors, setSuccesses } = useMessage();

  const getToken = () => JSON.parse(localStorage.getItem("user"))?.token;

  const getMemberships = async ({ page = 1, status = "all" }) => {
    try {
      setLoading(true);
      const token = getToken();

      const { data } = await getMembershipsRequest(page, status, token);

      if (data.success) {
        setMemberships(data.data.memberships);
        setMeta(data.data.meta);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMembership = async (dni) => {
    try {
      setLoading(true);
      const token = getToken();

      const { data } = await getMembershipRequest(dni, token);

      if (data.success) return data.data.membership;
      return null;
    } catch (error) {
      const { data } = error.response;
      setErrors(data.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createMembership = async (membership) => {
    try {
      const token = getToken();

      const { data } = await createMembershipRequest(membership, token);

      if (data.success) {
        setMemberships((prev) => [...prev, data.data.membership]);
        navigate("/matriculas");
        setSuccesses(data.message);
      }
    } catch (error) {
      const { data } = error.response;
      setErrors(data.message);
    }
  };

  const updateMembership = async (id, membership) => {
    try {
      setLoading(true);
      const token = getToken();
      const { data } = await updateMembershipRequest(id, membership, token);
      if (data.success) {
        setSuccesses(data.message);
        return data.data.membership;
      }
      return null;
    } catch (error) {
      const { data } = error.response;
      setErrors(data.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MembershipContext.Provider
      value={{
        memberships,
        getMemberships,
        getMembership,
        createMembership,
        updateMembership,
        meta,
        loading,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};

export default MembershipProvider;
