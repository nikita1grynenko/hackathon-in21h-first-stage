import axios from 'axios';
import { Quest } from '../models/quest.model';

interface QuestsResponse {
  quests: Quest[];
  totalCount: number;
}

export const fetchAllQuests = async (
  page: number = 1,
  pageSize: number = 10
): Promise<QuestsResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/quests?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
