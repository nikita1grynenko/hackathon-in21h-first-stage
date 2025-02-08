import z from "zod";

export const RatingSchema = z.object({
  ratingId: z.string(),
  questId: z.string(),
  stars: z.number().max(5).min(1),
  comment: z.string(),
  ratedAt: z.date(),
});

export type Rating = z.infer<typeof RatingSchema>;
