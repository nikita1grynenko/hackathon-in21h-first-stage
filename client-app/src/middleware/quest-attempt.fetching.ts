import instance from "../axios-config";
import { 
  AttemptSubmit, 
  QuestAttempt, 
  AttemtSubmitSchema, 
  QuestAttemptSchema, 
  AttemptResultSchema, 
  AttemptResult 
} from "../models/quest-attempt.model";

export const fetchUserQuestAttempts = async (): Promise<QuestAttempt[]> => {
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

    const result = QuestAttemptSchema.array().safeParse(response.data);

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

export const createQuestAttempt = async (attempt: AttemptSubmit): Promise<AttemptResult | undefined> => {
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
    const response = await instance.post(`/quest-attempts/submit`, validatedData.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      console.error('No response data');
      return;
    }

    const result = AttemptResultSchema.safeParse(response.data);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    return result.data;
  } catch (error) {
    console.error('Помилка при створенні спроби квесту:', error);
  }
}