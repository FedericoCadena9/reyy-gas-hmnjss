import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  operatorNumbers: any = [];
  gasPrice: any = [];
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

  constructor(
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.clientService.getPhoneNumbers().subscribe((res) => {
      console.log(res);
      this.operatorNumbers = res;

      //Crear colores aleatorios para los operadores
      for (const user of this.operatorNumbers) {
        user.colors =
          'bg-' + this.colors[Math.floor(Math.random() * 17)] + '-500';
      }
    });

    this.clientService.getGasPrices().subscribe((res) => {
      console.log(res);
      this.gasPrice = res;
    });
  }

  // Función para obtener los colores de los operadores
  getUserClasses(user: any) {
    return {
      [user.colors]: true,
    };
  }
}
