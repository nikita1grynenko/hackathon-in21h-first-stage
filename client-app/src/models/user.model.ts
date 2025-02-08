import z from "zod";
import { QuestSchema } from "./quest.model";
import { PickedQuestSchema } from "./picked-quest.model";
import { FeedbackSchema } from "./feedback.model";

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string(),

  pickedQuests: z.array(PickedQuestSchema),
  createdQuests: z.array(QuestSchema),
  feedbacks: z.array(FeedbackSchema),
});

export type User = z.infer<typeof UserSchema>;
