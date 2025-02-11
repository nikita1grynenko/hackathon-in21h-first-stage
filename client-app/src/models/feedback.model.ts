import z from 'zod';

export const FeedbackCreateSchema = z.object({
  questId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).nullable(),
});

export const FeedbackSchema = FeedbackCreateSchema.extend({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  userName: z.string(),
  createdAt: z.string().optional(),
});

export type FeedbackCreate = z.infer<typeof FeedbackCreateSchema>;
export type Feedback = z.infer<typeof FeedbackSchema>;
