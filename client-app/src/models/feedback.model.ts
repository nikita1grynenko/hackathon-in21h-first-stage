import z from 'zod';

export const FeedbackSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  userId: z.string().uuid(),
  userName: z.string().max(50),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).nullable(),
  createdAt: z
    .string()
    .transform(
      (dateString) => new Date(dateString.replace(/(\.\d{3})\d+/, '$1'))
    ),
});

export type Feedback = z.infer<typeof FeedbackSchema>;

export const FeedbackCreateSchema = z.object({
  questId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).nullable(),
});

export type FeedbackCreate = z.infer<typeof FeedbackCreateSchema>;
