import z from "zod";
import { QuestTaskSimplifiedSchema } from "./quest-task.model";

export const MediaTypeSchema = ['Image', 'Video'] as const;

export type MediaType = typeof MediaTypeSchema[number];

export const TaskMediaSimplifiedSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  url: z.string().max(500),
  mediaType: z.number().transform((val) => MediaTypeSchema[val])
});

export const TaskMediaSchema = TaskMediaSimplifiedSchema.merge(z.object({
  task: z.lazy(() => QuestTaskSimplifiedSchema)
}));

export type TaskMedia = z.infer<typeof TaskMediaSchema>;
