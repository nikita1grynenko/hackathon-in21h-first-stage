import instance from '../axios-config';
import {
  FeedbackCreateSchema,
  FeedbackSchema,
  type Feedback,
  type FeedbackCreate,
} from '../models/feedback.model';

export const fetchAllQuestFeedbacks = async (
  questId: string
): Promise<Feedback[]> => {
  const response = await instance.get(`/feedbacks/quest/${questId}`);

  const result = FeedbackSchema.array().safeParse(response.data.items);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};

export const fetchFeedbackById = async (
  id: string
): Promise<Feedback | null> => {
  const response = await instance.get(`/feedbacks/${id}`);

  const result = FeedbackSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return null;
  }

  return result.data;
};

// TODO: remove JWT usage
export const createFeedback = async (
  feedback: FeedbackCreate
) => {
  console.log('Перед відправкою фідбеку:', feedback);

  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Токен не знайдено');
    return;
  }

  // const { userName } = decodeJWT(token);

  // const fullFeedback: FeedbackCreate = {
  //   ...feedback,
  //   userId: userName,
  //   userName,
  // };

  console.log('Валідація фідбеку:', feedback);
  const result = FeedbackCreateSchema.safeParse(feedback);
  if (!result.success) {
    console.error('Помилка валідації:', result.error);
    return;
  }

  try {
    const response = await instance.post(`/feedbacks`, result.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Отримана відповідь:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при створенні фідбека:', error);
  }

  return null;
};

export const deleteFeedback = async (feedbackId: string) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Токен не знайдено');
    return;
  }

  try {
    const response = await instance.delete(`/feedbacks/${feedbackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Фідбек успішно видалено:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при видаленні фідбека:', error);
    return null;
  }
};
