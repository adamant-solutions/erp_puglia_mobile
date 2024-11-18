import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManutenzioneRoutingModule } from './manutenzione-routing.module';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ManutenzionePage } from './pages/manutenzione/manutenzione.page';


@NgModule({
  declarations: [ManutenzionePage],
  imports: [
    CommonModule,
    ManutenzioneRoutingModule,
    IonicModule,
    FooterComponent
  ]
})
export class ManutenzioneModule { }
