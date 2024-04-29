import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';

@NgModule({
  declarations: [AppointmentPageComponent],
  imports: [CommonModule, AppointmentRoutingModule],
})
export class AppointmentModule {}
