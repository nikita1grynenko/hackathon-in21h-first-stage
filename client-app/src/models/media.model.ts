import z from "zod";

export const MediaSchema = z.object({
  mediaId: z.string(),
  taskId: z.string(),
  mediaType: z.enum([
    "Image",
    "Video",
  ]),
  url: z.string(),
});

export type Media = z.infer<typeof MediaSchema>;
