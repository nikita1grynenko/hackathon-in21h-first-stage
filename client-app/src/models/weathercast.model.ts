import z from "zod";

export const WeatherForecastSchema = z.object({
  date: z.string(),
  temperatureC: z.number(),
  temperatureF: z.number(),
  summary: z.enum([
    "Freezing",
    "Bracing",
    "Hot",
    "Mild",
    "Cool",
    "Chilly",
    "Warm",
    "Scorching",
    "Sweltering",
    "Balmy",
  ]),
});

export type WeatherForecast = z.infer<typeof WeatherForecastSchema>;
