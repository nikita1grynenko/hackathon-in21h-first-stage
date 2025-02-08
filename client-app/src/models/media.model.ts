import z from "zod";

export const MediaSchema = z.object({
  // mediaId: z.string().uuid(),
  // taskId: z.string().uuid(),
  // mediaType: z.enum([
  //   "Image",
  //   "Video",
  // ]),
  // url: z.string(),
}); // * TODO: need to implement on backend side

export type Media = z.infer<typeof MediaSchema>;
