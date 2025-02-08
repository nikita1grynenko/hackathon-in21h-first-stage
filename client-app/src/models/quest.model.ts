import z from "zod";
import { TaskSchema } from "./task.model";

export const QuestSchema = z.object({
  questId: z.string(),
  title: z.string(),
  description: z.string(),
  tasks: z.array(TaskSchema),
  authorId: z.string(),
  rating: z.number(),
});

export type Quest = z.infer<typeof QuestSchema>;
