import instance from '../axios-config';
import {
  QuestSimplifiedSchema,
  QuestSchema,
  type Quest,
  type QuestSimplified,
} from '../models/quest.model';

const QUESTS_PER_PAGE = 10;

export const fetchAllQuests = async (page = 1): Promise<QuestSimplified[]> => {
  const response = await instance.get(`/quests`, {
    params: { page, limit: QUESTS_PER_PAGE },
  });

  const result = QuestSimplifiedSchema.array().safeParse(response.data.items);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};

export const fetchQuestById = async (id: string): Promise<Quest | null> => {
  const response = await instance.get(`/quests/${id}`);

  const result = QuestSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return null;
  }

  return result.data;
};

export const createQuest = async (quest: Quest) => {
  const response = await instance.post(`/quests`, quest);

  const result = QuestSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return;
  }

  console.log('Creating feedback', result.data);
  // await axios.post(`/feedbacks`, result.data);
};

export const fetchAmountOfQuests = async (): Promise<number | null> => {
  const response = await instance.get(`/quests/total`);

  const result = response.data;

  if (!result) {
    console.error('No data');
    return null;
  }

  return result as number;
};
