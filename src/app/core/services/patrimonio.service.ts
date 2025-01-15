import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Patrimonio } from '../models/patrimonio.model';
import { catchError, from, Observable } from 'rxjs';
import { PatrimonioSearchParams } from '../resolvers/patrimonio.resolver';
import { Platform } from '@ionic/angular';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {
    constructor(
      private http: HttpClient,
      @Inject('patrimonioUrl') private patrimonioUrl: string,
      private platform: Platform,
      private httpWrapper: HttpWrapperService
    ) {}
  

    getPatrimonioData(params: PatrimonioSearchParams): Observable<any> {
          let httpParams = new HttpParams()
            .set('pagina', (params.pagina || 0).toString());
  
          if (params.comune) {
            httpParams = httpParams.set('comune', params.comune);
          }
          if (params.indirizzo) {
            httpParams = httpParams.set('indirizzo', params.indirizzo);
          }
          if(params.statoDisponibilita){
            httpParams = httpParams.set('statoDisponibilita', params.statoDisponibilita);
          }

  
          if (this.platform.is('hybrid')) {
            const options = {
              url: this.patrimonioUrl,
              method: 'GET',
              params: this.convertParams(httpParams)
            };
  
            return from(this.httpWrapper.capacitorHttpRequest(options,false));
          } else {
            return this.http.get<Patrimonio[]>(this.patrimonioUrl, {
              params: httpParams,
              observe: 'response'
            }).pipe(
              catchError(error => { throw error; })
            );
          }
    }  

  getPatrimonioById(id: string){
    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.patrimonioUrl}/${id}`,
        method: 'GET'
      };
      return from(this.httpWrapper.capacitorHttpRequest(options,false));
    } else {
    return this.http.get<Patrimonio>(`${this.patrimonioUrl}/${id}`).pipe(
      catchError(e => { throw (e) }));
    }
  }


   
  addPatrimonio(patrimonioData: Patrimonio, documentiFiles: File[]) {

    const formData = new FormData();
    const patrimonioCopy = { ...patrimonioData };
  
    if (!patrimonioCopy.documenti) {
      patrimonioCopy.documenti = [];
    }

    patrimonioCopy.documenti.forEach((documento, index) => {
      const file = documentiFiles[index];
      if (file) {
        documento.percorsoFile = file.name;
        documento.contentType = file.type;
      }
    });

    const patrimonioBlob = new Blob([JSON.stringify(patrimonioCopy)], {
      type: 'application/json'
    });
    
    formData.append('unitaImmobiliare', patrimonioBlob, 'patrimonio.json');

    documentiFiles.forEach(file => {
      formData.append('documenti', file);
    });


    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.patrimonioUrl}`,
        method: 'POST',
        data: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': "application/json"
        }
      };

      return from(this.httpWrapper.capacitorHttpRequest(options,true));
    }
    else {
      return this.http.post<Patrimonio[]>(`${this.patrimonioUrl}`, formData).pipe(
        catchError(e => { throw (e) })
      );
    }

  }

  editPatrimonio(patrimonioData: Patrimonio){
    if (this.platform.is('hybrid')) {
      
      const options = {
        url: `${this.patrimonioUrl}`,
        method: 'PUT',
        data: patrimonioData,
        headers: {
          'Accept': 'application/json',
          'Content-Type' : "application/json"
        }
      };
      
      return from(this.httpWrapper.capacitorHttpRequest(options,true));
    }
    else {
      return this.http.put<Patrimonio>(`${this.patrimonioUrl}`, patrimonioData).pipe(
        catchError(e => { throw (e) })
      );
    }

  }

  
  eliminaPatrimonio(id: number) {
    if (this.platform.is('hybrid')) {

      const options = {
        url: `${this.patrimonioUrl}/${id}`,
        method: 'DELETE'
      };
      return from(this.httpWrapper.capacitorHttpRequest(options,true));
    }
    else {
      return this.http.delete<Patrimonio>(`${this.patrimonioUrl}/${id}`).pipe(
        catchError(e => { throw (e) })
      );
    }
  }

  
  private convertParams(params: HttpParams): Record<string, string> {
    return params.keys().reduce((acc, key) => {
      acc[key] = params.get(key) as string;
      return acc;
    }, {} as Record<string, string>);
  }
}
