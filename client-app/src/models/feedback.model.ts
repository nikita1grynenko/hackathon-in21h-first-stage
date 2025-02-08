import z from "zod";

export const FeedbackSchema = z.object({
  id: z.string().uuid(),
  rating: z.number().max(5).min(1),
  comment: z.string(),
  createdAt: z.date(),
  userId: z.string().uuid(),
  questId: z.string().uuid(),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
