import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Appointment } from '../../../core/models/Appointment.model';
import { Medication } from '../../../core/models/Medication.model';
import { Procedure } from '../../../core/models/Procedure.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  getAppointmentByUserId(id: string): Observable<Appointment> {
    return this.http
      .get(`${this.apiUrl}/appointments?userId=${id}`)
      .pipe(map((response: any) => response));
  }

  getProceduresBySpecialityId(id: string): Observable<Procedure[]> {
    return this.http
      .get(`${this.apiUrl}/procedures?specialtyId=${id}`)
      .pipe(map((response: any) => response));
  }

  getMedicationsBySpecialityId(id: string): Observable<Medication[]> {
    return this.http
      .get(`${this.apiUrl}/medications?specialtyId=${id}`)
      .pipe(map((response: any) => response));
  }
}
