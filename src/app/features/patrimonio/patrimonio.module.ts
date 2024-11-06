import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrimonioRoutingModule } from './patrimonio-routing.module';
import { IonicModule } from '@ionic/angular';
import { PatrimonioPage } from './pages/patrimonio/patrimonio.page';


@NgModule({
  declarations: [PatrimonioPage],
  imports: [
    CommonModule,
    IonicModule,
    PatrimonioRoutingModule
  ]
})
export class PatrimonioModule { }
