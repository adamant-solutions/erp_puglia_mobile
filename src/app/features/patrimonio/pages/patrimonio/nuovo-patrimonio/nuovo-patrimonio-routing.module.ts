import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovoPatrimonioPage } from './nuovo-patrimonio.page';

const routes: Routes = [
  {
    path: '',
    component: NuovoPatrimonioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovoPatrimonioPageRoutingModule {}
