import axios from 'axios';
import {
  QuestSimplifiedSchema,
  QuestSchema,
  type Quest,
} from '../models/quest.model';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllQuests = async (): Promise<Quest[]> => {
  try {
    console.log(`Fetching quests from ${apiUrl}/api/quests`);
    const response = await axios.get(`${apiUrl}/api/quests`);

    console.log('Response data:', response.data);

    const result = QuestSchema.array().safeParse(response.data.items);

    if (!result.success) {
      console.error('Validation failed:', result.error);
      return [];
    }

    return result.data; // ✅ Повертаємо лише перевірені дані
  } catch (error) {
    console.error('Error fetching quests:', error);
    throw new Error('Не вдалося отримати квести');
  }
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
