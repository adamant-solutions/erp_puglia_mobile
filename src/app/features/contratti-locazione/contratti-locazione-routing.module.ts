import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContrattiLocazionePage } from './pages/contratti-locazione/contratti-locazione.page';

const routes: Routes = [
  { path: "" ,   component: ContrattiLocazionePage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContrattiLocazioneRoutingModule { }
