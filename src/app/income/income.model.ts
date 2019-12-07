import { Schedule } from '../model/schedule.model';

export interface Income {
  id: number;
  name: string;
  amount: number;
  schedule: Schedule;
}
