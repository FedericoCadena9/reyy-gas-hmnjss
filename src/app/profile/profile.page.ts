import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app- profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userToken: any;
  userInfo: any;
  public loaded: boolean = false;
  userForm: FormGroup;
  showPassword: boolean = false;
  isSubmitted = false;
  isLoading = false;
  user = {
    email: '',
    username: '',
  };

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private userService: UserService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router, 
  ) {}

  async ngOnInit() {
    const user = await Preferences.get({ key: 'auth-token' });
    this.userToken = user.value;

    this.getInfoUser(this.userToken);

    this.userForm = this.formBuilder.group(
      {
        email: ['', Validators.email],
        nombres: [''],
        apellidoPaterno: [''],
        apellidoMaterno: [''],
        currentPassword: [''],
        password: [''],
        passwordConfirmation: [''],
      },
      { validator: this.matchingPasswords('password', 'passwordConfirmation') }
    );
  }

  // Toast
  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

  // Alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Cuidado!',
      subHeader: '¿Estás seguro de que quieres eliminar tu cuenta?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar cuenta',
          role: 'confirm',
          handler: () => {
            this.onDeleteAccount();
          },
        },
      ],
    });

    await alert.present();
  }

  // Función para obtener la información del usuario
  getInfoUser(token: string) {
    this.userService.getInfoUser(token).subscribe(
      (res) => {
        this.userInfo = res;
        this.loaded = true;

        const username = this.userInfo?.username || '';
        const parts = username.split(' ');

        let nombres = '';
        let apellidoPaterno = '';
        let apellidoMaterno = '';

        if (parts.length === 1) {
          nombres = parts[0];
        } else if (parts.length === 2) {
          nombres = parts[0];
          apellidoPaterno = parts[1];
        } else if (parts.length === 3) {
          nombres = parts[0];
          apellidoPaterno = parts[1];
          apellidoMaterno = parts[2];
        } else if (parts.length >= 4) {
          nombres = parts[0] + ' ' + parts[1];
          apellidoPaterno = parts[2];
          apellidoMaterno = parts[3];
        }

        // Actualizar los valores del formulario
        this.userForm.patchValue({
          email: this.userInfo?.email || '',
          nombres: nombres,
          apellidoPaterno: apellidoPaterno,
          apellidoMaterno: apellidoMaterno,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Función para obtener los controles del formulario
  get errorControl() {
    return this.userForm.controls;
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

  // Función para actualizar la información del usuario
  onSumbit() {
    this.isLoading = true;
    const form = this.userForm.value;

    this.user.email = form.email;
    this.user.username =
      form.nombres + ' ' + form.apellidoPaterno + ' ' + form.apellidoMaterno;

    this.userService
      .updateUserInfo(this.userToken, this.userInfo.id, this.user)
      .subscribe((res) => {
        console.log(res);
        this.presentToast('bottom', 'Datos actualizados correctamente');
        this.isLoading = false;
      });
  }

  // Función para actualizar la contraseña
  onChangePassword() {
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const form = this.userForm.value;

      this.userService
        .changePassword(
          this.userToken,
          form.currentPassword,
          form.password,
          form.passwordConfirmation
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.presentToast('bottom', 'Contraseña actualizada correctamente');
            this.isSubmitted = false;
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
            this.presentToast('bottom', 'Error al actualizar la contraseña');
            this.isSubmitted = false;
            this.isLoading = false;
          }
        );
    }
  }

  // Función para eliminar la cuenta
  onDeleteAccount() {
    console.log('Eliminar cuenta');
    this.authService
      .deleteUser(this.userInfo.id, this.userToken)
      .subscribe((res) => {
        console.log(res);
        this.presentToast('bottom', 'Cuenta eliminada correctamente');
        this.router.navigateByUrl('/login ', { replaceUrl: true });
      });
  }
}
