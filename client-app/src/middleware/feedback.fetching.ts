import instance from "../axios-config";
import {
  FeedbackSchema,
  type Feedback,
} from "../models/feedback.model";

export const fetchAllQuestFeedbacks = async (questId: string): Promise<Feedback[]> => {
  const response = await instance.get(`/feedbacks/quest/${questId}`);

  const result = FeedbackSchema.array().safeParse(response.data.items);

  if (!result.success) {
    console.error(result.error);
    return [];
  }

  return result.data;
};

export const fetchFeedbackById = async (id: string): Promise<Feedback | null> => {
  const response = await instance.get(`/feedbacks/${id}`);

  const result = FeedbackSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    return null;
  }

  return result.data;
};

export const createFeedback = async (feedback: Feedback) => {
  const result = FeedbackSchema.safeParse(feedback);

  if (!result.success) {
    console.error(result.error);
    return;
  }

  await instance.post(`/feedbacks`, result.data);
}

export const deleteFeedback = async (id: string) => {
  await instance.delete(`/feedbacks/${id}`);
}