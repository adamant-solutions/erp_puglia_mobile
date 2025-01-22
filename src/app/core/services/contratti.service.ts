import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, from, catchError } from 'rxjs';
import { Contratti, StatoContratto } from '../models/contratti.model';

import { HttpWrapperService } from './http-wrapper.service';
import { ContrattiSearchParams } from '../resolvers/contratti.resolver';
import { ModelLight } from '../models/model-light.model';

@Injectable({
  providedIn: 'root'
})
export class ContrattiService {

  constructor(
    private http: HttpClient,
    @Inject('contrattiUrl') private contrattiUrl: string,
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    @Inject('patrimonioUrl') private patrimonioUrl: string,
    private platform: Platform,
    private httpWrapper: HttpWrapperService
  ) { }

  getContrattiData(params: ContrattiSearchParams): Observable<any> {
    let httpParams = new HttpParams()
      .set('pagina', (params.pagina || 0).toString());

      if (params.indirizzo) {
        httpParams = httpParams.set('indirizzo', params.indirizzo);
      }
      if (params.canoneMensileMin) {
        httpParams = httpParams.set('canoneMensileMin', params.canoneMensileMin);
      }
      if (params.canoneMensileMax) {
        httpParams = httpParams.set('canoneMensileMax', params.canoneMensileMax);
      }
      if (params.dataInizioFrom) {
        httpParams = httpParams.set('dataInizioFrom', params.dataInizioFrom);
      }
      if (params.dataInizioTo) {
        httpParams = httpParams.set('dataInizioTo', params.dataInizioTo);
      }
      if (params.dataFineTo) {
        httpParams = httpParams.set('dataFineTo', params.dataFineTo);
      }

  

    if (this.platform.is('hybrid')) {
      const options = {
        url: this.contrattiUrl,
        method: 'GET',
        params: this.convertParams(httpParams)
      };

      return from(this.httpWrapper.capacitorHttpRequest(options, false));
    } else {
      return this.http.get<Contratti[]>(this.contrattiUrl, {
        params: httpParams,
        observe: 'response'
      }).pipe(
        catchError(error => { throw error; })
      );
    }
  }

  getContrattiById(id: string) {
    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.contrattiUrl}/${id}`,
        method: 'GET'
      };
      return from(this.httpWrapper.capacitorHttpRequest(options, false));
    } else {
      return this.http.get<Contratti>(`${this.contrattiUrl}/${id}`).pipe(
        catchError(e => { throw (e) }));
    }
  }


  getUnitaImmobiliare(){
    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.patrimonioUrl}/light`,
        method: 'GET'
      };
      return from(this.httpWrapper.capacitorHttpRequest(options, false));
    } else {
      return this.http.get<ModelLight>(`${this.patrimonioUrl}/light`,{ observe: 'response'}).pipe(
        catchError(e => { throw (e) }));
    }
  }

  getIntestatari(){
    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.anagraficaUrl}/light`,
        method: 'GET'
      };
      return from(this.httpWrapper.capacitorHttpRequest(options, false));
    } else {
      return this.http.get<ModelLight>(`${this.anagraficaUrl}/light`,{ observe: 'response'}).pipe(
        catchError(e => { throw (e) }));
    }
  }

  update(id: number, contratto: Contratti): Observable<Contratti> {
    return this.http.put<Contratti>(`${this.contrattiUrl}/${id}`, contratto);
  }

  /**
   * Terminate a Contratti by ID
   */
  terminaContratto(id: number, motivoFine: string): Observable<void> {
    const params = new HttpParams().set('motivoFine', motivoFine);
    return this.http.put<void>(`${this.contrattiUrl}/${id}/termina`, null, { params });
  }

  /**
   * Update the state of a Contratti
  */
  updateStato(id: number, statoContratto: StatoContratto): Observable<Contratti> {
    return this.http.patch<Contratti>(`${this.contrattiUrl}/${id}/stato`, statoContratto);
  }


  private convertParams(params: HttpParams): Record<string, string> {
    return params.keys().reduce((acc, key) => {
      acc[key] = params.get(key) as string;
      return acc;
    }, {} as Record<string, string>);
  }

}
