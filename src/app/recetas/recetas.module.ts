import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasPageRoutingModule } from './recetas-routing.module';

import { RecetasPage } from './recetas.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasPageRoutingModule,
    PipesModule
  ],
  declarations: [RecetasPage]
})
export class RecetasPageModule {}
