import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [DashboardPageComponent, AppointmentsComponent, ProceduresComponent, MedicinesComponent, UserInfoComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
