import axios from 'axios';
import {
  QuestSimplifiedSchema,
  QuestSchema,
  type Quest,
} from '../models/quest.model';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllQuests = async (): Promise<Quest[]> => {
  console.log(import.meta.env);
  const response = await axios.get(`${apiUrl}/quests`);

  const result = QuestSchema.array().safeParse(response.data.items);
  console.log(response.data);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};

export const fetchQuestById = async (id: string): Promise<Quest> => {
  const response = await axios.get(`${apiUrl}/api/quests/${id}`);

  const result = QuestSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return {} as Quest;
  }

  return result.data;
};

export const createQuest = async (quest: Quest): Promise<Quest> => {
  const response = await axios.post(`${apiUrl}/api/quests`, quest);

  const result = QuestSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return {} as Quest;
  }

  return result.data;
};
