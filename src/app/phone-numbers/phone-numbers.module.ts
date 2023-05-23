import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { PhoneNumbersPageRoutingModule } from './phone-numbers-routing.module';

import { PhoneNumbersPage } from './phone-numbers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneNumbersPageRoutingModule,
    PipesModule,
  ],
  declarations: [PhoneNumbersPage],
})
export class PhoneNumbersPageModule {}
