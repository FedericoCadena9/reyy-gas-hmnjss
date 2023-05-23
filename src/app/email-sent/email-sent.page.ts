import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.page.html',
  styleUrls: ['./email-sent.page.scss'],
})
export class EmailSentPage implements OnInit {
  email: string;
  isToastOpen = false;
  msg: string;


  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = history.state.email;
  }

  onResendEmail(isOpen: boolean) {

    this.userService
      .forgotPassword(this.email)
      .subscribe(
        (res) => {
          console.log('Correo enviado');
          this.isToastOpen = isOpen;
          this.msg = 'Correo enviado';

        },
        (error) => {
          console.log('Error en el envío de correo:', error);
          this.msg =
            'Ha ocurrido un problema. Por favor, inténtelo más tarde.';
        }
      );
  }
}
