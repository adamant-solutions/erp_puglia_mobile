import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Anagrafica } from '../models/anagrafica.model';
import { catchError } from 'rxjs';
import { Platform } from '@ionic/angular';
/* import { HTTP } from '@awesome-cordova-plugins/http/ngx'; */

@Injectable({
  providedIn: 'root'
})
export class AnagraficaService {

  constructor(
    //private nativeHttp: HTTP,
    private httpClient: HttpClient,
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    private platform: Platform
  ) { }

  getAnagraficaList(pageIndex: number) {
    if (this.platform.is('hybrid')) {
      console.log("is hybrid")
      return
      /*    return this.nativeHttp.get(`${this.anagraficaUrl}?pagina=${pageIndex}`, {}, {})
           .then(response => {
             return response;
           })
           .catch(error => {
             throw error;
           }); */
    
    }
    else {
             return this.httpClient.get<Anagrafica[]>(`${this.anagraficaUrl}?page=${pageIndex}`).pipe(
              catchError(e => { throw (e) })
            );
    }
  }
}
