import z from 'zod';
import { QuestSimplifiedSchema } from './quest.model';
import { FeedbackSchema } from './feedback.model';
import { QuestAttemptSchema } from './quest-attempt.model';

export const ApplicationUserSimplifiedSchema = z.object({
  id: z.string().uuid(),
  avatarUrl: z.string().nullable()
});

export const ApplicationUserSchema = ApplicationUserSimplifiedSchema.merge(z.object({
  questsCreated: z.array(QuestSimplifiedSchema),
  feedbacks: z.array(FeedbackSchema),
  questAttempts: z.array(QuestAttemptSchema)
}));

export type ApplicationUser = z.infer<typeof ApplicationUserSchema>;
