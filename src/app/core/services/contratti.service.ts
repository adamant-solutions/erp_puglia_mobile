import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, from, catchError } from 'rxjs';
import { Contratti } from '../models/contratti.model';

import { HttpWrapperService } from './http-wrapper.service';
import { ContrattiSearchParams } from '../resolvers/contratti.resolver';

@Injectable({
  providedIn: 'root'
})
export class ContrattiService {

  constructor(
    private http: HttpClient,
    @Inject('contrattiUrl') private contrattiUrl: string,
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


  private convertParams(params: HttpParams): Record<string, string> {
    return params.keys().reduce((acc, key) => {
      acc[key] = params.get(key) as string;
      return acc;
    }, {} as Record<string, string>);
  }

}
