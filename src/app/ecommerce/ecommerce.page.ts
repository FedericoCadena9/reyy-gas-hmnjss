import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.page.html',
  styleUrls: ['./ecommerce.page.scss'],
})
export class EcommercePage implements OnInit {
  products: any = [];
  textSearch: string = '';
  userToken: any;

  constructor(private clientService: ClientService) {}

  async ngOnInit() {
    const user = await Preferences.get({ key: 'auth-token' });
    this.userToken = user.value;

    this.getProducts(this.userToken);
  }

  // Función para obtener los productos
  getProducts(token: string) {
    this.clientService.getProducts(token).subscribe((res) => {
      this.products = res;
      console.log(this.products);
      
    });
  }

  // Función para filtrar las recetas por nombre
  search(event: any) {
    this.textSearch = event.detail.value;
  }
}
