import { useQuery } from '@tanstack/react-query';
import { fetchAllQuests } from '../middleware/quest.fetching';

export const useQuests = () => {
  return useQuery({
    queryKey: ['quests'],
    queryFn: fetchAllQuests,
  });
};