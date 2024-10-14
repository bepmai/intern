import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    MatInputModule,
    FormsModule,
    MatIcon,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      fullname: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
        Validators.pattern(
          '^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơẠ-ỹ ]+$'
        ),
      ]),

      email: new FormControl('', [Validators.required, Validators.email]),

      phonenumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(0?)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-9])[0-9]{7}$'
        ),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'        ),
      ]),
    });
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value);
    this.router.navigate(['/']);
  }
}
