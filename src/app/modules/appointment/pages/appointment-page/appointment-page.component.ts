import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Speciality } from '../../../../core/models/Speciality.model';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.css'],
})
export class AppointmentPageComponent implements OnInit, OnDestroy {
  constructor(private appointmentService: AppointmentService) {}

  private subscription!: Subscription;
  public specialities: Speciality[] = [];

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllSpecialties();
  }

  getAllSpecialties() {
    this.subscription = this.appointmentService
      .getAllSpecialties()
      .subscribe((response) => {
        this.specialities = response;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
