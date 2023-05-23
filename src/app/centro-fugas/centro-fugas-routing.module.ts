import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentroFugasPage } from './centro-fugas.page';

const routes: Routes = [
  {
    path: '',
    component: CentroFugasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentroFugasPageRoutingModule {}
