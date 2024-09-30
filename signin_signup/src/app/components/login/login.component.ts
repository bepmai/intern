import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatIcon,
    RegisterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  loginError: string | null = null;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;

    const token = this.authService.login(email, password);
    if (token) {
      this.loginError = null;
      console.log('Đăng nhập thành công', this.loginForm.value);
      this.router.navigate(['/home']);
    } else {
      const userExists = this.authService['users'].some(
        (user) => user.email === email
      );
      if (!userExists) {
        this.loginError =
          'Tài khoản chưa đăng ký, mời bạn hãy đăng ký tài khoản';
      } else {
        this.loginError = 'Thông tin đăng nhập không chính xác';
      }
      console.error(this.loginError);
    }
  }
}
