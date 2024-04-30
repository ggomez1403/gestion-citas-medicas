import { Schedule } from './Schedule.model';

export interface Availability {
  doctorId: string;
  schedule: Schedule[];
}
