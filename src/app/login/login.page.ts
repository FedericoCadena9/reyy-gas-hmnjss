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

  get errorControl() {
    return this.loginForm.controls;
  }

  loginUser() {
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.isSubmitted = true;

      this.authService.loginUser(this.loginForm.value).subscribe((res) => {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
        this.isSubmitted = false;
      });
    }
  }
}
