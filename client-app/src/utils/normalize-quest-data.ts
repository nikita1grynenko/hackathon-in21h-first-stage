import { QuestTask, TaskTypeSchema } from "../models/quest-task.model";
import { Quest, QuestDificultySchema, QuestTopicSchema } from "../models/quest.model";
import { MediaTypeSchema, TaskMedia } from "../models/task-media.model";

function normalizeQuestData(data: Quest) {
  return {
    ...data,
    questScore: Number(data.questScore),
    timeLimit: Number(data.timeLimit),
    difficulty: QuestDificultySchema.indexOf(data.difficulty),
    topic: QuestTopicSchema.indexOf(data.topic),
    tasks: data.questTasks.map((task: QuestTask) => ({
      ...task,
      questionType: TaskTypeSchema.indexOf(task.questionType),
      media: task.media.map((media: TaskMedia) => ({
        ...media,
        mediaType: MediaTypeSchema.indexOf(media.mediaType),
      })),
    })),
  };
}

export default normalizeQuestData;
