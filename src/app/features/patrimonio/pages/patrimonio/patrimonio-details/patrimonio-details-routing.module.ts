import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatrimonioDetailsPage } from './patrimonio-details.page';

const routes: Routes = [
  {
    path: '',
    component: PatrimonioDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatrimonioDetailsPageRoutingModule {}
