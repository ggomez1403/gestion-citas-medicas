import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Appointment } from '../../../core/models/Appointment.model';
import { Availability } from '../../../core/models/Availability.model';
import { Doctor } from '../../../core/models/Doctor.model';
import { Speciality } from '../../../core/models/Speciality.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly apiUrl = environment.api;
  private appointment!: Appointment;

  constructor(private http: HttpClient) {}

  getAllSpecialties(): Observable<Speciality[]> {
    return this.http
      .get(`${this.apiUrl}/specialties`)
      .pipe(map((response: any) => response));
  }

  getSpecialityById(id: string): Observable<Speciality[]> {
    return this.http
      .get(`${this.apiUrl}/specialties?id=${id}`)
      .pipe(map((response: any) => response));
  }

  getDoctorsBySpeciality(specialityId: string): Observable<Doctor[]> {
    return this.http
      .get(`${this.apiUrl}/doctors?specialtyId=${specialityId}`)
      .pipe(map((response: any) => response));
  }

  getAvailability(): Observable<Availability[]> {
    return this.http
      .get(`${this.apiUrl}/availability`)
      .pipe(map((response: any) => response));
  }

  getDoctorById(id: string): Observable<Doctor[]> {
    return this.http
      .get(`${this.apiUrl}/doctors?id=${id}`)
      .pipe(map((response: any) => response));
  }

  getAppointmentByUser(id: string): Observable<Appointment[]> {
    return this.http
      .get(`${this.apiUrl}/appointments?userId=${id}`)
      .pipe(map((response: any) => response));
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http
      .get(`${this.apiUrl}/doctors`)
      .pipe(map((response: any) => response));
  }

  saveAppointment(appointment: Appointment) {
    return this.http
      .post(`${this.apiUrl}/appointments`, appointment)
      .pipe(tap(() => {}));
  }

  setAppointment(currentAppointment: Appointment) {
    this.appointment = currentAppointment;
    console.log(currentAppointment);
  }

  getAppointment() {
    if (this.appointment === undefined) {
      return null;
    } else {
      return this.appointment;
    }
  }
}
