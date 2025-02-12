import instance from "../axios-config";
import { AttemptSubmit, QuestAttemptSimplified, AttemtSubmitSchema, QuestAttemptSimplifiedSchema } from "../models/quest-attempt.model";

export const fetchUserQuestAttempts = async (): Promise<QuestAttemptSimplified[]> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Токен не знайдено');
    return [];
  }

  try {
    const response = await instance.get(`/quest-attempts/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = QuestAttemptSimplifiedSchema.array().safeParse(response.data.items);

    if (!result.success) {
      console.error(result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Помилка при отриманні спроби квесту:', error);
  }

  return [];
}

export const createQuestAttempt = async (attempt: AttemptSubmit) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Токен не знайдено');
    return;
  }

  const validatedData = AttemtSubmitSchema.safeParse(attempt);

  if (!validatedData.success) {
    console.error('Помилка валідації:', validatedData.error);
    return;
  }

  try {
    const response = await instance.post(`/quest-attempts/submit`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      console.error('No response data');
      return;
    }
  } catch (error) {
    console.error('Помилка при створенні спроби квесту:', error);
  }
}