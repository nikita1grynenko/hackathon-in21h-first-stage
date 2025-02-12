import { QuestTask, TaskTypeSchema } from "../models/quest-task.model";
import { QuestCreate } from "../models/quest.model";
import { MediaTypeSchema, TaskMedia } from "../models/task-media.model";

function normalizeQuestData(data: QuestCreate) {
  return {
    title: data.title,
    description: data.description,
    questScore: Number(data.questScore),
    timeLimit: Number(data.timeLimit),
    difficulty: data.difficulty,
    topic: data.topic,
    tasks: data.tasks.map((task: QuestTask) => ({
      title: task.title,
      description: task.description,
      questionType: TaskTypeSchema.indexOf(task.questionType),
      media: task.media.map((media: TaskMedia) => ({
        url: media.url,
        mediaType: MediaTypeSchema.indexOf(media.mediaType),
      })),
      options: task.options.map((option) => ({
        test: option.text,
        isCorrect: Boolean(option.isCorrect),
      })),
    })),
  };
}

export default normalizeQuestData;
