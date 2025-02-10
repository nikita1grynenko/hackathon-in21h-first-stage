import z from 'zod';
import { QuestSimplifiedSchema } from './quest.model';
import { FeedbackSchema } from './feedback.model';
import { QuestAttemptSchema } from './quest-attempt.model';

export const ApplicationUserSimplifiedSchema = z.object({
  id: z.string().uuid(),
  userName: z.string().max(50),
  email: z.string().email(),
  passwordHash: z.string(),
  avatarUrl: z.string().nullable(),
});

export const ApplicationUserSchema = ApplicationUserSimplifiedSchema.merge(
  z.object({
    questsCreated: z.array(z.lazy(() => QuestSimplifiedSchema)),
    feedbacks: z.array(z.lazy(() => FeedbackSchema)),
    questAttempts: z.array(z.lazy(() => QuestAttemptSchema)),
  })
);

export type ApplicationUser = z.infer<typeof ApplicationUserSchema>;
