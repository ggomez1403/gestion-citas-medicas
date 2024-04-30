import { Schedule } from './Schedule.model';

export interface Appointment {
  userId: string;
  doctorId: string;
  specialityId: string;
  specialityName: string;
  scheduleItem: Schedule;
  price: number;
}
