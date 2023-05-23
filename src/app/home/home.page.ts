import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  operadores: any = [];
  gasPrice: any = [];
  userToken: any;

  colors: any = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ];

  constructor(private clientService: ClientService, private router: Router) {}

  async ngOnInit() {
    const user = await Preferences.get({ key: 'auth-token' });
    this.userToken = user.value;

    this.getGasPrice(this.userToken);
    this.getOperadores(this.userToken);
  }

  // Función para obtener los colores de los operadores
  getUserClasses(user: any) {
    return {
      [user.colors]: true,
    };
  }

  // Función para obtener el precio de Gas
  getGasPrice(token: string) {
    this.clientService.getGasPrices(token).subscribe((res) => {
      console.log(res.data);
      this.gasPrice = res.data;
    });
  }

  // Función para obtener los operadores
  getOperadores(token: string) {
    this.clientService.getOperadores(token).subscribe((res) => {
      this.operadores = res.data;

      //Crear colores aleatorios para los operadores
      for (const user of this.operadores) {
        user.colors =
          'bg-' + this.colors[Math.floor(Math.random() * 17)] + '-500';
      }
    });
  }

  goToOrders() {
    this.router.navigate(['/tabs/orders']);
  }
}
