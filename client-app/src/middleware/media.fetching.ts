
import axios from "axios";
import {
  MediaSchema,
  Media,
} from "../models/media.model";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchMedia = async (): Promise<Media[]> => {
  const response = await axios.get(`${apiUrl}/media`);

  const result = MediaSchema.array().safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};

// * TODO: Need to update the backend to continue
