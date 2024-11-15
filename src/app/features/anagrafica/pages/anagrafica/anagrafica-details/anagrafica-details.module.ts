import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnagraficaDetailsPageRoutingModule } from './anagrafica-details-routing.module';

import { AnagraficaDetailsPage } from './anagrafica-details.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnagraficaDetailsPageRoutingModule,
    ReactiveFormsModule,
    FooterComponent
  ],
  declarations: [AnagraficaDetailsPage]
})
export class AnagraficaDetailsPageModule {}
