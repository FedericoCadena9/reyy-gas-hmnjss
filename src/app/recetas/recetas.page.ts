import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  recipesCategories: any = [];
  recipes: any = [];
  textSearch: string = '';
  selectedCategory: string = 'Todos';

  user = {
    identifier: 'Jair Lara',
    password: 'qwerty12345',
  };

  jwt: string = '';

  constructor(
    private clientService: ClientService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .jwtUser(this.user.identifier, this.user.password)
      .subscribe((jwt: string) => {
        this.jwt = jwt;
      });

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
