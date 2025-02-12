import z from "zod";

export const MediaTypeSchema = ['Зображення', 'Відео'] as const;

export type MediaType = typeof MediaTypeSchema[number];

export function isMediaType(value: string): value is MediaType {
  return MediaTypeSchema.includes(value as MediaType);
}

export const TaskMediaSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  url: z.string().max(500),
  mediaType: z.number().transform((val) => MediaTypeSchema[val])
});

export type TaskMedia = z.infer<typeof TaskMediaSchema>;
