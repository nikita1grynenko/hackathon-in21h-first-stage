import { useQuery } from '@tanstack/react-query';
import { fetchAllQuests, fetchQuestById } from '../middleware/quest.fetching';

export const useQuests = () => {
  return useQuery({
    queryKey: ['quests'],
    queryFn: fetchAllQuests,
  });
};

export const useQuestById = (id: string) => {
  return useQuery({
    queryKey: ['quest'],
    queryFn: () => fetchQuestById(id),
  });
};