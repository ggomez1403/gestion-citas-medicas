import { Schedule } from './Schedule.model';

export interface Appointment {
  userId: string;
  doctorId: string;
  scheduleItem: Schedule;
  price: number;
}
