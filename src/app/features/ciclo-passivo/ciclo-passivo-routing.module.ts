import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CicloPassivoPage } from './pages/ciclo-passivo/ciclo-passivo.page';

const routes: Routes = [ {
  path: '',
  component: CicloPassivoPage
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CicloPassivoRoutingModule { }
