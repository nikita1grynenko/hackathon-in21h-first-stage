import instance from '../axios-config';
import {
  QuestSimplifiedSchema,
  QuestSchema,
  type QuestCreate,
  type QuestSimplified,
  type Quest,
} from '../models/quest.model';
import normalizeQuestData from '../utils/normalize-quest-data';
import { selectItemsPerPage } from '../store/slices/pagination.slice';
import { store } from '../store/store';

export const fetchAllQuests = async (page: number): Promise<QuestSimplified[]> => {
  const state = store.getState();
  const itemsPerPage = selectItemsPerPage(state);

  const response = await instance.get(`/quests?page=${page}&pageSize=${itemsPerPage}`);
  console.log('response:', response);

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

export const createQuest = async (quest: QuestCreate) => { 
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Токен не знайдено');
    return;
  }

  try {
    const normalizedQuest = normalizeQuestData(quest);

    console.log('Перед відправкою фідбеку:', normalizedQuest);

    const response = await instance.post(`/quests`, normalizedQuest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Отримана відповідь:', response.data);
  } catch (error) {
    console.error('Помилка при створенні фідбека:', error);
  }
};

export const fetchAmountOfQuests = async (): Promise<number | null> => {
  const response = await instance.get(`/quests/total`);

  const result = response.data;

  if (!result) {
    console.error('No data');
    return null;
  }

  return result.totalQuests as number;
};
