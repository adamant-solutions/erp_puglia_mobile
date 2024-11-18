import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RipartizioneSpesePage } from './ripartizione-spese/ripartizione-spese.page';

const routes: Routes = [
  {
    path: '',
    component: RipartizioneSpesePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RipartizioneSpeseRoutingModule { }
