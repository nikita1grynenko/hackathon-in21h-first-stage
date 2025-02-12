import z from "zod";
import { ApplicationUserSimplifiedSchema } from "./application-user.model";
import { QuestSchema } from "./quest.model";

export const QuestAttemptSimplifiedSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  userScore: z.number(),
  userId: z.string().uuid(),
  startedAt: z.date(),
  completedAt: z.date().nullable()
});

export type QuestAttemptSimplified = z.infer<typeof QuestAttemptSimplifiedSchema>;

export const QuestAttemptSchema = QuestAttemptSimplifiedSchema.merge(z.object({
  quest: z.lazy(() => QuestSchema),
  user: z.lazy(() => ApplicationUserSimplifiedSchema)
}));

export type QuestAttempt = z.infer<typeof QuestAttemptSchema>;


export const AttemtSubmitSchema = z.object({
  questId: z.string().uuid(),
  answers: z.record(z.array(z.string()))
}); 

export type AttemptSubmit = z.infer<typeof AttemtSubmitSchema>;
