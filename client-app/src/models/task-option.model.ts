import z from 'zod';

export const TaskOptionSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  text: z.string().max(500),
  isCorrect: z.boolean().optional(),
});

export type TaskOption = z.infer<typeof TaskOptionSchema>;
