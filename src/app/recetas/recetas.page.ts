import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  recipesCategories: any = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getRecipesCategories().subscribe((res) => {
      console.log(res);
      this.recipesCategories = res;
    });
  }
}
