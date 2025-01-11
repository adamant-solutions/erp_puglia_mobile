import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovoPatrimonioPageRoutingModule } from './nuovo-patrimonio-routing.module';

import { NuovoPatrimonioPage } from './nuovo-patrimonio.page';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NuovoPatrimonioPageRoutingModule,
    CapitalizePipe
  ],
  declarations: [NuovoPatrimonioPage]
})
export class NuovoPatrimonioPageModule {}
