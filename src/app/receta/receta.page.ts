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

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.recipeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.clientService.getRecipe(this.recipeId).subscribe((res) => {
      this.recipe = res;
      this.loaded = true;
    });
  }
}
