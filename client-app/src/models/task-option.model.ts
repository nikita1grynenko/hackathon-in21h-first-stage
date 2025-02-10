import z from 'zod';
import { QuestTaskSimplifiedSchema } from './quest-task.model';

export const TaskOptionSimplifiedSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  text: z.string().max(500),
  isCorrect: z.boolean()
});

export const TaskOptionSchema = TaskOptionSimplifiedSchema.merge(z.object({
  task: QuestTaskSimplifiedSchema,
}));

export type TaskOption = z.infer<typeof TaskOptionSchema>;
