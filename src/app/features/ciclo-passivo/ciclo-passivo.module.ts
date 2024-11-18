import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CicloPassivoRoutingModule } from './ciclo-passivo-routing.module';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { CicloPassivoPage } from './pages/ciclo-passivo/ciclo-passivo.page';


@NgModule({
  declarations: [CicloPassivoPage],
  imports: [
    CommonModule,
    CicloPassivoRoutingModule,
    IonicModule,
    FooterComponent
  ]
})
export class CicloPassivoModule { }
