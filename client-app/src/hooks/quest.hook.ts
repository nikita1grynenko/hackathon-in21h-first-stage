import { useQuery } from '@tanstack/react-query';
import { fetchAllQuests, fetchQuestById } from '../middleware/quest.fetching';

export const useQuests = (currentPage?: number) => {
  return useQuery({
    queryKey: ['quests'],
    queryFn: () => fetchAllQuests(currentPage),
  });
};

export const useQuestById = (id: string) => {
  return useQuery({
    queryKey: ['quest'],
    queryFn: () => fetchQuestById(id),
  });
};