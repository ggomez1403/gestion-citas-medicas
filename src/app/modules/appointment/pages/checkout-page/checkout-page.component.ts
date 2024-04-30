import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Appointment } from '../../../../core/models/Appointment.model';
import { Doctor } from '../../../../core/models/Doctor.model';
import { UserJSON } from '../../../../core/models/UserJSON.model';
import { AuthService } from '../../../auth/services/auth.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent {
  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  public addressForm!: FormGroup;
  public checkoutForm!: FormGroup;
  public totalPrice!: number;
  public currentUser!: UserJSON;
  public appointment!: Appointment | null;
  public doctor!: Doctor;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkoutForm = this.initCheckoutForm();
    this.getUserInfo();
    this.appointment = this.appointmentService.getAppointment();
    this.getDoctorInfo(this.appointment?.doctorId!);
  }

  checkOut() {
    this.appointmentService
      .saveAppointment(this.appointment!)
      .subscribe((reponse) => {
        console.log('cita agendada');
      });
  }

  getUserInfo() {
    this.currentUser = this.authService.getUser();
  }

  getDoctorInfo(id: string) {
    this.appointmentService.getDoctorById(id).subscribe((response) => {
      this.doctor = response[0];
    });
  }

  initCheckoutForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          this.cardNumberValidator.bind(this),
        ],
      ],
      expirationMonth: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.min(1),
          Validators.max(12),
          this.expirationNumberValidator.bind(this),
        ],
      ],
      expirationYear: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.min(24),
          this.expirationNumberValidator.bind(this),
        ],
      ],
      cvc: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          this.CVCNumberValidator.bind(this),
        ],
      ],
    });
  }

  cardNumberValidator(control: FormControl) {
    const cardNumber = control.value;
    if (cardNumber && cardNumber.length !== 15) {
      return { invalidCardNumber: true };
    }
    return null;
  }

  expirationNumberValidator(control: FormControl) {
    const expNumber = control.value;
    if (expNumber && expNumber.length !== 2) {
      return { invalidExpNumber: true };
    }
    return null;
  }

  CVCNumberValidator(control: FormControl) {
    const cvcNumber = control.value;
    if (cvcNumber && cvcNumber.length !== 3) {
      return { invalidCVCNumber: true };
    }
    return null;
  }

  get address(): AbstractControl | null {
    return this.addressForm.get('address');
  }

  get references(): AbstractControl | null {
    return this.addressForm.get('references');
  }

  get name(): AbstractControl | null {
    return this.checkoutForm.get('name');
  }

  get cardNumber(): AbstractControl | null {
    return this.checkoutForm.get('cardNumber');
  }

  get expirationMonth(): AbstractControl | null {
    return this.checkoutForm.get('expirationMonth');
  }

  get expirationYear(): AbstractControl | null {
    return this.checkoutForm.get('expirationYear');
  }

  get cvc(): AbstractControl | null {
    return this.checkoutForm.get('cvc');
  }

  onNumberInput(event: any) {
    const input = event.target.value;
    const pattern = /^[0-9]+$/;
    if (!pattern.test(input)) {
      event.target.value = input.replace(/[^0-9]/g, '');
    }
  }
}
