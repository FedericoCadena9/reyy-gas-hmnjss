import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //Registrar un usuario
  setUser(user: any) {
    return this.http.post(`${environment.api_url}/auth/local/register`, user);
  }

  //Función para obtener el JWT de un User Logueado
  jwtUser(identifier: string, password: string) {
    const body = {
      identifier: identifier,
      password: password,
    };

    return this.http.post(`${environment.api_url}/auth/local`, body).pipe(
      map((res: any) => {
        return res.jwt;
      })
    );
  }
}
