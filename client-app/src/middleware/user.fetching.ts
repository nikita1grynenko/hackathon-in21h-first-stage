
import axios from "axios";
import {
  UserSchema,
  User,
} from "../models/user.model";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${apiUrl}/users`);

  const result = UserSchema.array().safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};

// * TODO: Need to update the backend to continue
