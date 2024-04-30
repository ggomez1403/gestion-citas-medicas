import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Medication } from '../../../../core/models/Medication.model';
import { AppointmentService } from '../../../appointment/services/appointment.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css'],
})
export class MedicinesComponent implements OnInit, OnDestroy {
  constructor(
    private dashBoardService: DashboardService,
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  private subscription!: Subscription;
  private userId!: string;
  public appointments: Appointment[] = [];
  public medicines: Medication[] = [];

  ngOnInit(): void {
    this.userId = this.authService.getUser().id;
    this.getAppointmentsByUserId(this.userId);
  }

  getAppointmentsByUserId(id: string) {
    this.subscription = this.appointmentService
      .getAppointmentByUser(id)
      .subscribe((response) => {
        this.appointments = response;
        this.getMedicinesForAppointments();
      });
  }

  getMedicinesForAppointments() {
    for (const appointment of this.appointments) {
      this.dashBoardService
        .getMedicationsBySpecialityId(appointment.specialityId)
        .subscribe((medicine) => {
          this.medicines.push(...medicine);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
