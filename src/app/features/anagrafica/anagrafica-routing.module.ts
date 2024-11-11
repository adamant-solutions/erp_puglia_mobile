import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagraficaPage } from './pages/anagrafica/anagrafica.page';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnagraficaRoutingModule { }
