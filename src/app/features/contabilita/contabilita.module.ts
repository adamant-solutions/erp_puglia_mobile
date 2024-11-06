import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilitaRoutingModule } from './contabilita-routing.module';
import { ContabilitaPage } from './pages/contabilita/contabilita.page';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ContabilitaPage],
  imports: [
    CommonModule,
    IonicModule,
    ContabilitaRoutingModule
  ]
})
export class ContabilitaModule { }
