import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  recipesCategories: any = [];
  favoriteRecipes: any = [];
  recipes: any = [];
  textSearch: string = '';
  selectedCategory: string = 'Todos';

  constructor(private clientService: ClientService) {
    this.favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]'
    );
  }

  ngOnInit() {
    this.getRecipesCategories();
  }

  ionViewWillEnter() {
    // Actualizar los favoritos del LocalStorage
    this.favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]'
    );

    // Cargar la lista actualizada de recetas favoritas
    this.getRecipes();
  }

  // Función para obtener las categorías de las recetas
  getRecipesCategories() {
    this.clientService.getRecipesCategories().subscribe((res) => {
      this.recipesCategories = res;

      // Agregamos la categoría "Todos" al inicio del arreglo
      this.recipesCategories.unshift({
        id: 'all',
        attributes: {
          categoria: 'Todos',
        },
      });
    });
  }

  // Función para obtener las recetas
  getRecipes() {
    this.clientService.getRecipes(this.selectedCategory).subscribe((res) => {
      this.recipes = res;
    });
  }

  // Función para filtrar las recetas por nombre
  search(event: any) {
    this.textSearch = event.detail.value;
  }

  // Función para filtrar las recetas por categoría
  filterCategory(event: any) {
    this.selectedCategory = event.detail.value;

    this.clientService.getRecipes(this.selectedCategory).subscribe((res) => {
      this.recipes = res;
    });
  }
}
