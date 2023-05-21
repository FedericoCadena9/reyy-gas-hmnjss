import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable, from, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const USER = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user: any;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  //Función para obtener el JWT de un User Logueado
  async loadToken() {
    const user = await Preferences.get({ key: USER });
    if (user && user.value) {
      console.log('User: ', user);
      this.user = user.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  //Función para loguear un usuario
  loginUser(credentials: {
    identifier: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post(`${environment.api_url}/auth/local`, credentials)
      .pipe(
        map((res: any) => {
          Preferences.set({ key: USER, value: res.jwt });
          return res;
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      );
  }

  //Función para registrar un usuario
  registerUser(user: any): Observable<any> {
    return this.http
      .post(`${environment.api_url}/auth/local/register`, user)
      .pipe(
        map(
          (res: any) => {
            Preferences.set({ key: USER, value: res.jwt });
            return res;
          },
          tap((_) => {
            this.isAuthenticated.next(true);
          })
        )
      );
  }

  //Función para cerrar sesión
  logout() {
    this.isAuthenticated.next(false);
    Preferences.remove({ key: USER });
  }
}
