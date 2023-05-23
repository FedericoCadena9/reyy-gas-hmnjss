import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-centro-fugas',
  templateUrl: './centro-fugas.page.html',
  styleUrls: ['./centro-fugas.page.scss'],
})
export class CentroFugasPage implements OnInit {
  operadores: any = [];
  zonas: string[] = [];
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

  constructor(private clientService: ClientService) {}

  async ngOnInit() {
    const user = await Preferences.get({ key: 'auth-token' });
    this.userToken = user.value;

    this.getOperadores(this.userToken);
  }

  // Función para obtener los operadores
  getOperadores(token: string) {
    this.clientService.getOperadores(token).subscribe((res) => {
      this.operadores = res.data;

      this.zonas = Array.from(
        new Set(this.operadores.map((user: any) => user.attributes.zona))
      );

      //Crear colores aleatorios para los operadores
      for (const user of this.operadores) {
        user.colors =
          'bg-' + this.colors[Math.floor(Math.random() * 17)] + '-500';
      }
    });
  }

  // Función para obtener los colores de los operadores
  getUserClasses(user: any) {
    return {
      [user.colors]: true,
    };
  }
}
