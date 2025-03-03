import z from "zod";
import { ApplicationUserSimplifiedSchema } from "./application-user.model";
import { QuestSchema } from "./quest.model";

export const QuestAttemptSimplifiedSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  userScore: z.number(),
  userId: z.string().uuid(),
  userName: z.string().max(50),
  completedAt: z
      .string()
      .transform(
        (dateString) => new Date(dateString.replace(/(\.\d{3})\d+/, '$1'))
      ),
  startedAt: z
      .string()
      .transform(
        (dateString) => new Date(dateString.replace(/(\.\d{3})\d+/, '$1'))
      ),
});

export type QuestAttemptSimplified = z.infer<typeof QuestAttemptSimplifiedSchema>;

export const QuestAttemptSchema = QuestAttemptSimplifiedSchema.merge(z.object({
  quest: z.lazy(() => QuestSchema).optional(),
  user: z.lazy(() => ApplicationUserSimplifiedSchema.nullable()).optional()
}));

export type QuestAttempt = z.infer<typeof QuestAttemptSchema>;


export const AttemtSubmitSchema = z.object({
  questId: z.string().uuid(),
  answers: z.record(z.array(z.string()))
}); 

export type AttemptSubmit = z.infer<typeof AttemtSubmitSchema>;

export const AttemptResultTask = z.enum(["true", "partiallyTrue", "false"]);

export const AttemptResultSchema = z.object({
  score: z.number(),
  correctAnswers: z.record(z.array(z.string())),
  correctTasks: z.record(AttemptResultTask)
});

export type AttemptResult = z.infer<typeof AttemptResultSchema>;
