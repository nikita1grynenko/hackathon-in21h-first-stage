import z from "zod";
import { QuestSimplifiedSchema } from "./quest.model";
import { TaskMediaSimplifiedSchema } from "./task-media.model";
import { TaskOptionSimplifiedSchema } from "./task-option.model";

export const TaskTypeSchema = ['SingleChoice', 'MultipleChoice', 'OpenAnswer'];

export const QuestTaskSimplifiedSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  title: z.string().max(200),
  questionType: z.number().transform((val) => TaskTypeSchema[val]),
  quest: z.lazy(() => QuestSimplifiedSchema).optional(),
});

export const QuestTaskSchema = QuestTaskSimplifiedSchema.merge(z.object({
  description: z.string().nullable(),
  options: z.array(z.lazy(() => TaskOptionSimplifiedSchema)),
  media: z.array(z.lazy(() => TaskMediaSimplifiedSchema))
}));

export type QuestTask = z.infer<typeof QuestTaskSchema>;
