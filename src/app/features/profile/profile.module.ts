import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {IonicModule} from '@ionic/angular';
import {ProfilePage} from './profile/profile.page';
import {FooterComponent} from 'src/app/shared/footer/footer.component';


@NgModule({
  declarations: [ProfilePage],
  imports: [
    CommonModule,
    IonicModule,
    ProfileRoutingModule,
    FooterComponent
  ]
})
export class ProfileModule {
}
