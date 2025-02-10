import z from "zod";
import { ApplicationUserSimplifiedSchema } from "./application-user.model";
import { QuestSimplifiedSchema } from "./quest.model";

export const FeedbackSimplifiedSchema = z.object({
  id: z.string().uuid(),
  questId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).nullable(),
  createdAt: z.date()
});

export const FeedbackSchema = FeedbackSimplifiedSchema.merge(z.object({
  quest: QuestSimplifiedSchema,
  user: ApplicationUserSimplifiedSchema
}));

export type Feedback = z.infer<typeof FeedbackSchema>;
