import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  // Función para obtener los precios de Gas Lp
  getGasPrices() {
    return this.http.get('assets/db/gasPrice.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  // Función para obtener los números de los operadores
  getPhoneNumbers() {
    return this.http.get('assets/db/numbers.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  //Función para obtener los tips
  getTips() {
    return this.http.get('assets/db/tips.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  //Función para obtener las categorías de las recetas
  getRecipesCategories() {
    return this.http.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
  }
}
