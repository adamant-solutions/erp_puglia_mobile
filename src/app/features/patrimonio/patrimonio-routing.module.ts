import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatrimonioPage } from './pages/patrimonio/patrimonio.page';

const routes: Routes = [
  {
    path: '',
    component: PatrimonioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatrimonioRoutingModule { }
