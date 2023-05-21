import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signUpForm: FormGroup;
  showPassword: boolean = false;
  isSubmitted = false;
  user = {
    email: '',
    username: '',
    password: '',
    confirmed: true,
    blocked: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get errorControl() {
    return this.signUpForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSumbit() {

    if (!this.signUpForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.isSubmitted = true;
      const form = this.signUpForm.value;
      this.user.email = form.email;
      this.user.username =
        form.nombres + ' ' + form.apellidoPaterno + ' ' + form.apellidoMaterno;
      this.user.password = form.password;

      this.authService.registerUser(this.user).subscribe((res) => {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
        this.isSubmitted = false;
      });
    }
  }
}
