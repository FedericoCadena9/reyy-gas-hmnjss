import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneNumbersPage } from './phone-numbers.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneNumbersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneNumbersPageRoutingModule {}
