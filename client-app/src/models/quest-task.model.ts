import z from "zod";
import { QuestSimplifiedSchema } from "./quest.model";
import { TaskMediaSimplifiedSchema } from "./task-media.model";
import { TaskOptionSchema } from "./task-option.model";

export const TaskTypeSchema = ['SingleChoice', 'MultipleChoice', 'OpenAnswer'] as const;

export type TaskType = typeof TaskTypeSchema[number];

export function isTaskType(value: string): value is TaskType {
  return TaskTypeSchema.includes(value as TaskType);
}

export const QuestTaskSimplifiedSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  title: z.string().max(200),
  questionType: z.number().transform((val) => TaskTypeSchema[val]),
  quest: z.lazy(() => QuestSimplifiedSchema).optional(),
});

export const QuestTaskSchema = QuestTaskSimplifiedSchema.merge(z.object({
  description: z.string().nullable(),
  options: z.array(z.lazy(() => TaskOptionSchema)),
  media: z.array(z.lazy(() => TaskMediaSimplifiedSchema))
}));

export type QuestTask = z.infer<typeof QuestTaskSchema>;
