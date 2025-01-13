import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaPatrimonioPageRoutingModule } from './modifica-patrimonio-routing.module';

import { ModificaPatrimonioPage } from './modifica-patrimonio.page';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterComponent,
    ModificaPatrimonioPageRoutingModule,
    CapitalizePipe
  ],
  declarations: [ModificaPatrimonioPage]
})
export class ModificaPatrimonioPageModule {}
