import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaPatrimonioPageRoutingModule } from './modifica-patrimonio-routing.module';

import { ModificaPatrimonioPage } from './modifica-patrimonio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaPatrimonioPageRoutingModule
  ],
  declarations: [ModificaPatrimonioPage]
})
export class ModificaPatrimonioPageModule {}
