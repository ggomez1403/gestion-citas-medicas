import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Doctor } from '../../../../core/models/Doctor.model';
import { AppointmentService } from '../../../appointment/services/appointment.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  private subscription!: Subscription;
  private userId!: string;
  public appointments: Appointment[] = [];
  public doctors: Doctor[] = [];

  ngOnInit(): void {
    this.userId = this.authService.getUser().id;
    this.getAppointmentsByUserId(this.userId);
    this.getDoctors();
  }

  getAppointmentsByUserId(id: string) {
    this.subscription = this.appointmentService
      .getAppointmentByUser(id)
      .subscribe((response) => {
        this.appointments = response;
      });
  }

  getDoctors() {
    this.subscription = this.appointmentService
      .getAllDoctors()
      .subscribe((response) => {
        this.doctors = response;
      });
  }

  getDoctorName(doctorId: string): string {
    const doctor = this.doctors.find((d) => d.id === doctorId);
    return doctor ? doctor.name : 'Nombre no encontrado';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
