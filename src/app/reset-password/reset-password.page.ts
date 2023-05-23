import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;
  showPassword: boolean = false;
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  code: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.code = this.getParamValue('code') ?? '';
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.matchingPasswords('password', 'confirmPassword') }
    );
  }

  // Función para hacer el reset de la contraseña
  onSubmit() {
    this.isSubmitted = true;
    if (!this.resetPasswordForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      if (
        this.code &&
        this.resetPasswordForm.controls.password.value ===
          this.resetPasswordForm.controls.confirmPassword.value
      ) {
        this.isLoading = true;
        this.userService
          .resetPassword(
            this.code,
            this.resetPasswordForm.controls.password.value,
            this.resetPasswordForm.controls.confirmPassword.value
          )
          .subscribe((res) => {
            console.log('Contraseña cambiada con éxito:', res);
            this.router.navigateByUrl('/login ', { replaceUrl: true });
            this.isLoading = false;
          });
      }
    }
  }

  get errorControl() {
    return this.resetPasswordForm.controls;
  }

  // Función para ver el valor de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Función para validar que las contraseñas coincidan
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true,
        };
      }
    };
  }

  // Función para obtener el valor del parámetro code
  private getParamValue(paramName: string): string | null {
    return this.route.snapshot.queryParamMap.get(paramName);
  }
}
