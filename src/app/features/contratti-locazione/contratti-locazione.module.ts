import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContrattiLocazioneRoutingModule } from './contratti-locazione-routing.module';
import { IonicModule } from '@ionic/angular';
import { ContrattiLocazionePage } from './pages/contratti-locazione/contratti-locazione.page';


@NgModule({
  declarations: [ContrattiLocazionePage],
  imports: [
    CommonModule,
    IonicModule,
    ContrattiLocazioneRoutingModule
  ]
})
export class ContrattiLocazioneModule { }
