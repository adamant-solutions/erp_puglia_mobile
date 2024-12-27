import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { httpsInterceptor } from './core/interceptors/https.interceptor';
import { AuthorizationService } from './core/services/authorization.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    provideHttpClient(withInterceptors([httpsInterceptor])),
    AuthorizationService,
    { provide: 'accessTokenUrl', useValue: environment.accessTokenUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
