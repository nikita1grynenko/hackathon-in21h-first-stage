
import axios from "axios";
import {
  RatingSchema,
  Rating,
} from "../models/rating.model";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllRatings = async (): Promise<Rating[]> => {
  const response = await axios.get(`${apiUrl}/weatherforecast`);

  const result = RatingSchema.array().safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};

// * TODO: Need to update the backend to continue
