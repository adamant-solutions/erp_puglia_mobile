import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovaAnagraficaPageRoutingModule } from './nuova-anagrafica-routing.module';

import { NuovaAnagraficaPage } from './nuova-anagrafica.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovaAnagraficaPageRoutingModule,
    FooterComponent
  ],
  declarations: [NuovaAnagraficaPage]
})
export class NuovaAnagraficaPageModule {}
