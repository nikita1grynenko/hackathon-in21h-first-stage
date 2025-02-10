import z from 'zod';
import { FeedbackSchema } from './feedback.model';
import { ApplicationUserSimplifiedSchema } from './application-user.model';
import { QuestTaskSchema } from './quest-task.model';

export const QuestSimplifiedSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(200),
  description: z.string().nullable(),
  questScore: z.number(),
  timeLimit: z.number(),
  createdByUserId: z.string().uuid(),
});

export const QuestSchema = QuestSimplifiedSchema.merge(
  z.object({
    createdByUser: z.lazy(() => ApplicationUserSimplifiedSchema), // * TODO: move to simplified schema after updating backend
    questTasks: z.array(z.lazy(() => QuestTaskSchema)),
    feedbacks: z.array(z.lazy(() => FeedbackSchema)),
  })
);

export type Quest = z.infer<typeof QuestSchema>;
