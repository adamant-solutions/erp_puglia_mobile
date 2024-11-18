import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManutenzionePage } from './pages/manutenzione/manutenzione.page';

const routes: Routes = [
  {
    path: '',
    component: ManutenzionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManutenzioneRoutingModule { }
