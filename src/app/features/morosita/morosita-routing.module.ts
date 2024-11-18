import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorositaPage } from './morosita/morosita.page';

const routes: Routes = [  {
  path: '',
  component: MorositaPage
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorositaRoutingModule { }
