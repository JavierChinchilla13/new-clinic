import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

const getUser = () => api.get("/login");
const createUser = () => api.post("/login");

export { getUser, createUser };
