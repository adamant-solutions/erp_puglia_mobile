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

  getAnagraficaList(cf?: string,pageIndex?: number) {
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
             return this.httpClient.get<Anagrafica[]>(`${this.anagraficaUrl}?codiceFiscale=${cf}&pagina=${pageIndex}`).pipe(
              catchError(e => { throw (e) })
            );
    }
  }

  
  getAnagraficaById(id: string){
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
             return this.httpClient.get<Anagrafica[]>(`${this.anagraficaUrl}/${id}`, {headers: {'Accept':'application/json'} }).pipe(
              catchError(e => { throw (e) })
            );
    }
  }
  
  addAnagrafica(data: Anagrafica){
    return this.httpClient.post<Anagrafica[]>(`${this.anagraficaUrl}`, data).pipe(
      catchError(e => { throw (e) })
    );
  }

  editAnagrafica(data: any) { //any type temp
    return this.httpClient.put<any>(`${this.anagraficaUrl}`, data).pipe(
      catchError(e => { throw (e) })
    );
  }

  
  eliminaAnagrafica(id: string) {
    return this.httpClient.delete<Anagrafica>(`${this.anagraficaUrl}/${id}`).pipe(
      catchError(e => { throw (e) })
    );
  }
}
