// ? TODO: Do we still need this model? 

import z from "zod";

export const RatingSchema = z.object({
  ratingId: z.string().uuid(),
  questId: z.string().uuid(),
  stars: z.number().max(5).min(1),
  comment: z.string(),
  ratedAt: z.date(),
});

export type Rating = z.infer<typeof RatingSchema>;
