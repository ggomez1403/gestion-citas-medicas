import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService
  ) {}

  public loginForm!: FormGroup;
  public errorSession!: boolean;
  private subscription!: Subscription;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginForm = this.initForm();

    this.subscription = this.authService.errorLogin$.subscribe((error) => {
      this.errorSession = error;
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.authService.resetErrorSession();
  }
}
