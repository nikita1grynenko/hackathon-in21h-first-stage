import z from "zod";
import { FeedbackSchema } from "./feedback.model";
import { ApplicationUserSimplifiedSchema } from "./application-user.model";
import { QuestTaskSchema } from "./quest-task.model";

export const QuestSimplifiedSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(200),
  questScore: z.number(),
  timeLimit: z.number(),
  createdByUserId: z.string().uuid()
});

export const QuestSchema = QuestSimplifiedSchema.merge(z.object({
  description: z.string().nullable(),
  createdByUser: z.array(ApplicationUserSimplifiedSchema),
  questTasks: z.array(QuestTaskSchema),
  feedbacks: z.array(FeedbackSchema)
}));

export type Quest = z.infer<typeof QuestSchema>;