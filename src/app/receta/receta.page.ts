import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
  recipeId: any;
  recipe: any;
  sliderOptions = {
    zoom: true,
  };
  public loaded = true;
  buttonState: boolean;
  favoriteRecipes;
  showSteps: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]'
    );
  }

  ngOnInit() {
    this.recipeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.clientService.getRecipe(this.recipeId).subscribe((res) => {
      this.recipe = res;

      const favoriteRecipe = this.favoriteRecipes.find(
        (recipe: any) => recipe.id === this.recipeId
      );

      this.buttonState = favoriteRecipe ? favoriteRecipe.state : false;

      this.loaded = true;
    });
  }

  addFavoriteRecipe() {
    this.buttonState = !this.buttonState;
    if (this.buttonState) {
      const favoriteRecipeObject = {
        id: this.recipeId,
        attributes: this.recipe.attributes,
        state: this.buttonState,
      };
      this.favoriteRecipes.push(favoriteRecipeObject);
    } else {
      const index = this.favoriteRecipes.findIndex(
        (favorite: any) => favorite.id === this.recipeId
      );

      // Verificar si se encontró el favoriteRecipe
      if (index !== -1) {
        // Eliminar el favoriteRecipe del array favoriteRecipes utilizando splice()
        this.favoriteRecipes.splice(index, 1);
      }
    }

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(this.favoriteRecipes)
    );
  }

  shareSteps() {
    this.showSteps = !this.showSteps;
    console.log(this.showSteps);
    
  }
}
