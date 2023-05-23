import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { CentroFugasPageRoutingModule } from './centro-fugas-routing.module';

import { CentroFugasPage } from './centro-fugas.page';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    IonicModule,
    CentroFugasPageRoutingModule
  ],
  declarations: [CentroFugasPage]
})
export class CentroFugasPageModule {}
