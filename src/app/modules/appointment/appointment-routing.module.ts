import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { SpecialityPageComponent } from './pages/speciality-page/speciality-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentPageComponent,
  },
  {
    path: 'speciality/:id',
    component: SpecialityPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
