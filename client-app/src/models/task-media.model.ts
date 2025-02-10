import z from "zod";
import { QuestTaskSimplifiedSchema } from "./quest-task.model";

export const MediaTypeSchema = z.enum(['Image', 'Video']);

export const TaskMediaSimplifiedSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  url: z.string().max(500),
  mediaType: MediaTypeSchema
});

export const TaskMediaSchema = TaskMediaSimplifiedSchema.merge(z.object({
  task: QuestTaskSimplifiedSchema
}));

export type TaskMedia = z.infer<typeof TaskMediaSchema>;
