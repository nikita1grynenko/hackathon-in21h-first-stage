import z from "zod";
import { TaskSchema } from "./task.model";
import { FeedbackSchema } from "./feedback.model";

export const QuestSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  timeLimitMinutes: z.string().regex(/^(\d+):(\d+):(\d+)$/), // TimeSpan like "hh:mm:ss"
  createdAt: z.date(),

  authorId: z.string().uuid(),

  tasks: z.array(TaskSchema),
  feedbacks: z.array(FeedbackSchema),
});

export type Quest = z.infer<typeof QuestSchema>;
