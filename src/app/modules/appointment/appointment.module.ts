import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { SpecialityPageComponent } from './pages/speciality-page/speciality-page.component';

@NgModule({
  declarations: [
    AppointmentPageComponent,
    SpecialityPageComponent,
    CheckoutPageComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class AppointmentModule {}
