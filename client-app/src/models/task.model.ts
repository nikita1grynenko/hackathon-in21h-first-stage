import z from "zod";

const AbstractTaskSchema = z.object({
  id: z.string().uuid(),
  question: z.string(),
  questId: z.string().uuid(),
});

export const OpenAnswerTaskSchema = AbstractTaskSchema.merge(
  z.object({
    type: z.literal("OpenAnswer"),
    correctAnswer: z.string(),
  })
);

export const OneChoiceTaskSchema = AbstractTaskSchema.merge(
  z.object({
    type: z.literal("OneChoice"),
    options: z.array(z.string()),
    correctOption: z.string(),
  })
);

export const MultipleChoiceTaskSchema = AbstractTaskSchema.merge(
  z.object({
    type: z.literal("MultipleChoice"),
    options: z.array(z.string()),
    correctOptions: z.array(z.string()),
  })
);

export const ImageSearchTaskSchema = AbstractTaskSchema.merge(
  z.object({
    type: z.literal("ImageSearch"),
    // * TODO: need to implement on backend side
  })
); 

export const TaskSchema = z.discriminatedUnion("type", [
  OpenAnswerTaskSchema,
  OneChoiceTaskSchema,
  MultipleChoiceTaskSchema,
  ImageSearchTaskSchema,
]);

export type Task = z.infer<typeof TaskSchema>;
