import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RipartizioneSpeseRoutingModule } from './ripartizione-spese-routing.module';
import { RipartizioneSpesePage } from './ripartizione-spese/ripartizione-spese.page';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/shared/footer/footer.component';


@NgModule({
  declarations: [RipartizioneSpesePage],
  imports: [
    CommonModule,
    RipartizioneSpeseRoutingModule,
    IonicModule,
    FooterComponent
  ]
})
export class RipartizioneSpeseModule { }
