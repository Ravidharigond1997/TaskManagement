import axios from "axios";

export const loginUser = async (userData) => {
  const response = await axios.post("/api/v1/user/login", userData);
  return response.data;
};
