import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContrattiEditPage } from './contratti-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ContrattiEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContrattiEditPageRoutingModule {}
