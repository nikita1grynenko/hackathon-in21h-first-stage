import z from "zod";

export const PickedQuestSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type PickedQuest = z.infer<typeof PickedQuestSchema>;
