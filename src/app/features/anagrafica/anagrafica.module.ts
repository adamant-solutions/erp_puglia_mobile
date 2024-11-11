import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnagraficaRoutingModule } from './anagrafica-routing.module';
import { IonicModule } from '@ionic/angular';
import { AnagraficaPage } from './pages/anagrafica/anagrafica.page';


@NgModule({
  declarations: [AnagraficaPage],
  imports: [
    CommonModule,
    IonicModule,
    AnagraficaRoutingModule
  ]
})
export class AnagraficaModule { }
