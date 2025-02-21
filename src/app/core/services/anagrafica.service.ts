import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Anagrafica } from '../models/anagrafica.model';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Platform } from '@ionic/angular';
import { AnagraficaSearchParams } from '../resolvers/anagrafica.resolver';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AnagraficaService {

  constructor(
    private httpClient: HttpClient,
    @Inject('anagraficaUrl') private anagraficaUrl: string,
    private httpWrapper: HttpWrapperService,
    private platform: Platform
  ) { }
  
  getAnagraficaListPaginated(params: AnagraficaSearchParams) {
    let httpParams = new HttpParams().set('pagina', (params.pagina || 0).toString())

    if (params.codiceFiscale) {
        httpParams = httpParams.set('codiceFiscale', params.codiceFiscale);
    }
    if (params.nome) {
        httpParams = httpParams.set('nome', params.nome);
    }
    if (params.cognome) {
        httpParams = httpParams.set('cognome', params.cognome);
    }

    const paramsForCapacitor = httpParams.keys().reduce((acc : any, key) => {
        acc[key] = httpParams.getAll(key)
;
        return acc;
    }, {} as {[key: string]: string});

    if (this.platform.is('hybrid')) {
        console.log("is hybrid");

        const options = {
            url: `${this.anagraficaUrl}`,
            method: 'GET',
            params: paramsForCapacitor
        };
        console.log("is options" , options);

        return from(this.httpWrapper.capacitorHttpRequest(options,false));
    } else {
        return this.httpClient.get<Anagrafica[]>(`${this.anagraficaUrl}`, { params: httpParams ,observe: 'response'}).pipe(
            catchError(e => { throw e; })
        );
    }
}
  
  getAnagraficaById(id: string){
    if (this.platform.is('hybrid')) {

      const options = {
        url: `${this.anagraficaUrl}/${id}`,
        method: 'GET'
    };

    return from(this.httpWrapper.capacitorHttpRequest(options,false));

    }
    else {
             return this.httpClient.get<Anagrafica[]>(`${this.anagraficaUrl}/${id}`, {headers: {'Accept':'application/json'} }).pipe(
              catchError(e => { throw (e) })
            );
    }
  }
  
  addAnagrafica(anagraficaData: Anagrafica, documentiFiles: File[]) {
    const formData = new FormData();
    const anagraficaCopy = { ...anagraficaData };
  
    if (!anagraficaCopy.cittadino.documenti_identita) {
      anagraficaCopy.cittadino.documenti_identita = [];
    }

    anagraficaCopy.cittadino.documenti_identita.forEach((documento, index) => {
      const file = documentiFiles[index];
      if (file) {
        documento.nomeFile = file.name;
        documento.contentType = file.type;
      }
    });

    const anagraficaBlob = new Blob([JSON.stringify(anagraficaCopy)], {
      type: 'application/json'
    });
    
    formData.append('anagrafica', anagraficaBlob, 'anagrafica.json');

    documentiFiles.forEach(file => {
      formData.append('documenti', file);
    });

    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.anagraficaUrl}`,
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
      return this.httpClient.post<Anagrafica[]>(`${this.anagraficaUrl}`, formData).pipe(
        catchError(e => { throw (e) })
      );
    }

  }

  async editAnagrafica(anagraficaData: Anagrafica, documentiFiles: any[]){

    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    let body = '';
  
    // Anagrafica 
    body += `--${boundary}\r\n`;
    body += 'Content-Disposition: form-data; name="anagrafica"; filename="anagrafica.json"\r\n';
    body += 'Content-Type: application/json\r\n\r\n';
    body += JSON.stringify(anagraficaData) + '\r\n';
 //   console.log("service DOCS: " , documentiFiles)
  
  if (this.platform.is('hybrid') && documentiFiles?.length) {
    // Filter out empty slots and undefined entries
    const validFiles = documentiFiles.filter(file => file && file.data && file.name);
    
    for (const file of validFiles) {
      try {
        const byteString = atob(file.data);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="documenti"; filename="${file.name}"\r\n`;
        body += `Content-Type: ${file.type || 'application/pdf'}\r\n\r\n`;
        body += uint8Array + '\r\n';
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        throw new Error(`Failed to process file ${file.name}: ${error}`);
      }
    }
  }

    body += `--${boundary}--\r\n`;
  
    const options = {
      url: `${this.anagraficaUrl}`,
      method: 'PUT',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      data: body
    };
    return from(this.httpWrapper.capacitorHttpRequest(options, true));
  }

  
  eliminaAnagrafica(id: number) {
    if (this.platform.is('hybrid')) {

      const options = {
        url: `${this.anagraficaUrl}/${id}`,
        method: 'DELETE'
      };

      return from(this.httpWrapper.capacitorHttpRequest(options,true));
    }
    else {
      return this.httpClient.delete<Anagrafica>(`${this.anagraficaUrl}/${id}`).pipe(
        catchError(e => { throw (e) })
      );
    }
  }

  downloadDocument(anagraficaId: number, documentoId: number): Observable<Blob> {

    if (this.platform.is('hybrid')) {

      const options = {
        url: `${this.anagraficaUrl}/${anagraficaId}/documenti/${documentoId}/download`,
        headers: {
          responseType: 'blob',
          observe: 'response'
        },
        method: 'GET'
      };

    return from(this.httpWrapper.capacitorHttpRequest(options,false));

    }
    else {
      return this.httpClient.get(
        `${this.anagraficaUrl}/${anagraficaId}/documenti/${documentoId}/download`,
        {
          responseType: 'blob',
          observe: 'response'
        }
      ).pipe(
        map(response => {
          const contentType = response.headers.get('content-type') || 'application/octet-stream';
          return new Blob([response.body as BlobPart], { type: contentType });
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
    }

  }
}
