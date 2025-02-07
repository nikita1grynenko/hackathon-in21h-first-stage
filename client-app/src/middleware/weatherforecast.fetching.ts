
import axios from "axios";
import {
  WeatherForecastSchema,
  WeatherForecast,
} from "../models/weathercast.model";


const apiUrl = import.meta.env.VITE_API_URL;

export const fetchWeatherForecast = async (): Promise<WeatherForecast[]> => {
  const response = await axios.get(`${apiUrl}/weatherforecast`);

  const result = WeatherForecastSchema.array().safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};
