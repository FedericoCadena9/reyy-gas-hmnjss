import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
    return this.http
      .get(`${environment.api_url}/tips-consumos?populate=*`)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  //Función para obtener un tip
  getTip(id: string) {
    return this.http
      .get(`${environment.api_url}/tips-consumos/${id}?populate=*`)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  //Función para obtener las categorías de recetas
  getRecipesCategories() {
    return this.http.get(`${environment.api_url}/categorias-recetas`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  //Función para obtener las recetas
  getRecipes(category: string) {
    let url = `${environment.api_url}/recetas?populate=*`;
    if (category && category !== 'Todos') {
      url += `&filters[categorias_receta][categoria][$eq]=${category}`;
    }

    return this.http.get(url).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  //Función para obtener una receta por id
  getRecipe(id: string) {
    return this.http.get(`${environment.api_url}/recetas/${id}?populate=*`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
