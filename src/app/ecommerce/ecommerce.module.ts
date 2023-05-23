import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { EcommercePageRoutingModule } from './ecommerce-routing.module';

import { EcommercePage } from './ecommerce.page';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    IonicModule,
    EcommercePageRoutingModule
  ],
  declarations: [EcommercePage]
})
export class EcommercePageModule {}
