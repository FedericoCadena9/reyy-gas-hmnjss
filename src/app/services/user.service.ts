import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //Función para mandar correo de recuperación de contraseña
  forgotPassword(email: string) {
    return this.http.post(`${environment.api_url}/auth/forgot-password`, {
      email: email,
    });
  }

  //Función para resetear la contraseña
  resetPassword(code: string, password: string, passwordConfirmation: string) {
    return this.http.post(`${environment.api_url}/auth/reset-password`, {
      code: code,
      password: password,
      passwordConfirmation: passwordConfirmation,
    });
  }

  changePassword(
    token: string,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) {
    return this.http.post(
      `${environment.api_url}/auth/change-password`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirmation: newPasswordConfirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  //Función para obtener el perfil del usuario
  getInfoUser(token: string) {
    return this.http
      .get(`${environment.api_url}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateUserInfo(token: string, id: string, user: any) {
    return this.http.put(`${environment.api_url}/users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
