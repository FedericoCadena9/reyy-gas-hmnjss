import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { IonicModule } from '@ionic/angular';

import { RecetaPageRoutingModule } from './receta-routing.module';

import { RecetaPage } from './receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxIonicImageViewerModule,
    RecetaPageRoutingModule
  ],
  declarations: [RecetaPage]
})
export class RecetaPageModule {}
