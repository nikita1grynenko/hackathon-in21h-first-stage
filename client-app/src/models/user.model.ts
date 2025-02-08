import z from "zod";
import { QuestSchema } from "./quest.model";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  questHistory: z.array(QuestSchema),
  avatarUrl: z.string(),
  role: z.enum([
    "Admin",
    "User",
  ]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
