import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {
  tips: any = [];

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

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getTips().subscribe((res) => {
      console.log(res);
      this.tips = res;

      //Crear colores aleatorios para los tips
      for (const tip of this.tips) {
        tip.colors = this.colors[Math.floor(Math.random() * 17)];
      }
    });
  }

  // Función para obtener los colores de los operadores
  getTipsClasses(user: any) {
    return {
      [user.colors]: true,
    };
  }
}
