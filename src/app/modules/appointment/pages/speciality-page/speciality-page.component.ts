import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Availability } from '../../../../core/models/Availability.model';
import { Doctor } from '../../../../core/models/Doctor.model';
import { Schedule } from '../../../../core/models/Schedule.model';
import { Speciality } from '../../../../core/models/Speciality.model';
import { AuthService } from '../../../auth/services/auth.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-speciality-page',
  templateUrl: './speciality-page.component.html',
  styleUrls: ['./speciality-page.component.css'],
})
export class SpecialityPageComponent implements OnInit, OnDestroy {
  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  private subscription!: Subscription;
  public doctors: Doctor[] = [];
  public speciality!: Speciality;
  public availability: Availability[] = [];

  private specialityId = this.route.snapshot.paramMap.get('id')!;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getSpecialityById();
    this.getDoctorsBySpeciality();
    this.getAvailability();
  }

  getDoctorsBySpeciality() {
    this.subscription = this.appointmentService
      .getDoctorsBySpeciality(this.specialityId)
      .subscribe((response) => {
        this.doctors = response;
      });
  }

  getSpecialityById() {
    this.subscription = this.appointmentService
      .getSpecialityById(this.specialityId)
      .subscribe((response: Speciality[]) => {
        this.speciality = response[0];
      });
  }

  getAvailability() {
    this.subscription = this.appointmentService
      .getAvailability()
      .subscribe((response) => {
        this.availability = response;
      });
  }

  saveAppointment(doctorId: string, scheduleItem: Schedule) {
    const userId = this.authService.getUser().id;

    const appointment: Appointment = {
      userId,
      doctorId,
      scheduleItem,
      specialityId: this.speciality.id,
      specialityName: this.speciality.name,
      price: 11900,
    };

    this.appointmentService.setAppointment(appointment);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
