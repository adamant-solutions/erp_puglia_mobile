import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaAnagraficaPageRoutingModule } from './modifica-anagrafica-routing.module';

import { ModificaAnagraficaPage } from './modifica-anagrafica.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModificaAnagraficaPageRoutingModule,
    FooterComponent
  ],
  declarations: [ModificaAnagraficaPage]
})
export class ModificaAnagraficaPageModule { }
