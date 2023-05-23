import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  msgError: string;
  isLoading = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      identifier: [
        '',
        Validators.compose([Validators.email, Validators.required]),
      ],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  loginUser() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.isLoading = true;
      this.authService.loginUser(this.loginForm.value).subscribe(
        (res) => {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.log('Error en el inicio de sesión:', error);
          this.msgError =
            'Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.';
        }
      );
    }
  }
}
