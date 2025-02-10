import z from "zod";
import { QuestSimplifiedSchema } from "./quest.model";
import { TaskMediaSimplifiedSchema } from "./task-media.model";
import { TaskOptionSimplifiedSchema } from "./task-option.model";

export const TaskTypeSchema = z.enum(['SingleChoice', 'MultipleChoice', 'OpenAnswer']);

export const QuestTaskSimplifiedSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  title: z.string().max(200),
  questionType: TaskTypeSchema
});

export const QuestTaskSchema = QuestTaskSimplifiedSchema.merge(z.object({
  quest: QuestSimplifiedSchema,
  description: z.string().nullable(),
  options: z.array(TaskOptionSimplifiedSchema),
  media: z.array(TaskMediaSimplifiedSchema)
}));

export type QuestTask = z.infer<typeof QuestTaskSchema>;
