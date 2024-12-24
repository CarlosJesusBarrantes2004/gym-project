import axios from "axios";

const URL = "http://localhost:3000/memberships";

export const getMembershipsRequest = (page, status, token) =>
  axios.get(`${URL}?page=${page}&status=${status}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getMembershipRequest = (dni, token) =>
  axios.get(`${URL}/${dni}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const createMembershipRequest = (membership, token) =>
  axios.post(URL, membership, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const updateMembershipRequest = (id, membership, token) =>
  axios.put(`${URL}/${id}`, membership, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
