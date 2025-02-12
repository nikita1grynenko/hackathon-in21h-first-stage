import z from 'zod';
import { FeedbackSchema } from './feedback.model';
import { ApplicationUserSimplifiedSchema } from './application-user.model';
import { QuestTaskSchema } from './quest-task.model';

export const QuestDificultySchema = [
  'Легко',
  'Трохи складно',
  'Складно',
] as const;
export type QuestDificulty = (typeof QuestDificultySchema)[number];

export function isQuestDificulty(value: string): value is QuestDificulty {
  return QuestDificultySchema.includes(value as QuestDificulty);
}

export const QuestTopicSchema = [
  'Математика',
  'Фізика',
  'Хімія',
  'Біологія',
  'Астрономія',
  'Географія',
  'Історія',
  'Література',
  'Мистецтво',
  'Філософія',
  'Політологія',
] as const;
export type QuestTopic = (typeof QuestTopicSchema)[number];

export function isQuestTopic(value: string): value is QuestTopic {
  return QuestTopicSchema.includes(value as QuestTopic);
}

export const QuestSimplifiedSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(200),
  description: z.string().nullable(),
  questScore: z.number(),
  timeLimit: z.number(),
  createdByUserId: z.string().uuid(),
  difficulty: z.number().transform((val) => QuestDificultySchema[val]),
  topic: z.number().transform((val) => QuestTopicSchema[val]),
});

export const QuestSchema = QuestSimplifiedSchema.merge(
  z.object({
    createdByUser: z.lazy(() => ApplicationUserSimplifiedSchema.nullable()),
    questTasks: z.array(z.lazy(() => QuestTaskSchema)),
    feedbacks: z.array(z.lazy(() => FeedbackSchema)),
  })
);

export type QuestSimplified = z.infer<typeof QuestSimplifiedSchema>;
export type Quest = z.infer<typeof QuestSchema>;

export const QuestCreateSchema = z.object({
  title: z.string().max(200),
  description: z.string().nullable(),
  questScore: z.number().min(1),
  timeLimit: z.number().min(1),
  difficulty: z
    .number()
    .min(0)
    .max(QuestDificultySchema.length - 1),
  topic: z
    .number()
    .min(0)
    .max(QuestTopicSchema.length - 1),
  tasks: z.array(z.lazy(() => QuestTaskSchema)),
});

export type QuestCreate = z.infer<typeof QuestCreateSchema>;
