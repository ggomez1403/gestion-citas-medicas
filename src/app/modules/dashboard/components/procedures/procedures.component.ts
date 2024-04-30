import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Procedure } from '../../../../core/models/Procedure.model';
import { AppointmentService } from '../../../appointment/services/appointment.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css'],
})
export class ProceduresComponent implements OnInit, OnDestroy {
  constructor(
    private dashBoardService: DashboardService,
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  private subscription!: Subscription;
  private userId!: string;
  public appointments: Appointment[] = [];
  public procedures: Procedure[] = [];

  ngOnInit(): void {
    this.userId = this.authService.getUser().id;
    this.getAppointmentsByUserId(this.userId);
  }

  getAppointmentsByUserId(id: string) {
    this.subscription = this.appointmentService
      .getAppointmentByUser(id)
      .subscribe((response) => {
        this.appointments = response;
        this.getProceduresForAppointments();
      });
  }

  getProceduresForAppointments() {
    for (const appointment of this.appointments) {
      this.dashBoardService
        .getProceduresBySpecialityId(appointment.specialityId)
        .subscribe((procedures) => {
          this.procedures.push(...procedures);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
