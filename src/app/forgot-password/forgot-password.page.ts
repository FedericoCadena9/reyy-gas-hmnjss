import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  msgError: string;
  isLoading = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
    });
  }

  get errorControl() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.forgotPasswordForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.isLoading = true;
      this.userService
        .forgotPassword(this.forgotPasswordForm.value.email)
        .subscribe(
          (res) => {
            this.isLoading = false;
            console.log('Correo enviado');
            this.router.navigateByUrl('/email-sent', {
              state: { email: this.forgotPasswordForm.value.email },
              replaceUrl: true,
            });
          },
          (error) => {
            this.isLoading = false;
            console.log('Error en el envío de correo:', error);
            this.msgError =
              'Ha ocurrido un problema. Por favor, inténtelo más tarde.';
          }
        );
      console.log(this.forgotPasswordForm.value);
    }
  }
}
