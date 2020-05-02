import { format } from 'date-fns';

export const timestampToDateString = (timestamp: number) => {
  return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
};
