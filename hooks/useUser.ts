
import axios from "axios";

export const useUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/api/users");
 
  return data;
};
export const useUser = async (userId: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/users/${userId}`);
  return data;
};
