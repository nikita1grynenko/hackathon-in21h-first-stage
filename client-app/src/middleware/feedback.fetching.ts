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

export const createFeedback = async (data: FeedbackCreate) => {
  try {
    const validatedData = FeedbackCreateSchema.parse(data);
    const response = await instance.post('/feedbacks', validatedData);

    const result = FeedbackSchema.safeParse(response.data);

    if (!result.success) {
      console.error('Помилка валідації відповіді:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Помилка при створенні фідбека:', error);
    return null;
  }
};

export const deleteFeedback = async (id: string) => {
  await instance.delete(`/feedbacks/${id}`);
};
