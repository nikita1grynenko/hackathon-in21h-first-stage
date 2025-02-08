import z from "zod";

export const OpenAnswerTaskSchema = z.object({
  // * TODO: Add the properties for the OpenAnswerTaskSchema
});

export const MultipleChoiceTaskSchema = z.object({
  // * TODO: Add the properties for the MultipleChoiceTaskSchema
});

export const ImageSearchTaskSchema = z.object({
  // * TODO: Add the properties for the ImageSearchTaskSchema
});

export const TaskSchema = z.union([OpenAnswerTaskSchema, MultipleChoiceTaskSchema, ImageSearchTaskSchema]);

export type Task = z.infer<typeof TaskSchema>;
