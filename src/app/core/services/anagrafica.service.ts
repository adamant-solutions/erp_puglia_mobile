import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Anagrafica } from '../models/anagrafica.model';
import { catchError, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { AnagraficaSearchParams } from '../resolvers/anagrafica.resolver';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AnagraficaService {

  constructor(
    private httpClient: HttpClient,
    @Inject('anagraficaUrl') private anagraficaUrl: string,
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

        return CapacitorHttp.get(options)
            .then(response => {
             /*  console.log("Roanda" ,response) */
                return response;
            })
            .catch(error => {
                throw error;
            }); 

    } else {
        return this.httpClient.get<Anagrafica[]>(`${this.anagraficaUrl}`, { params: httpParams }).pipe(
            catchError(e => { throw e; })
        );
    }
}

  getAllAnagrafica(){
    return this.httpClient.get(`${this.anagraficaUrl}/count`).pipe(
      catchError(e => { throw (e) }));
  }
  
  getAnagraficaById(id: string){
    if (this.platform.is('hybrid')) {

      const options = {
        url: `${this.anagraficaUrl}/${id}`,
        method: 'GET'
    };

    return CapacitorHttp.get(options)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error;
        }); 

    }
    else {
             return this.httpClient.get<Anagrafica[]>(`${this.anagraficaUrl}/${id}`, {headers: {'Accept':'application/json'} }).pipe(
              catchError(e => { throw (e) })
            );
    }
  }
  
  addAnagrafica(anagraficaData: Anagrafica) {
    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.anagraficaUrl}`,
        method: 'POST',
        data: anagraficaData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': "application/json"
        }
      };

      return new Observable((observer) => {
        CapacitorHttp.post(options)
          .then(response => {
            observer.next(response.data);
            observer.complete();
          })
          .catch(error => {
            console.log("Error: ", error)
            observer.error(error);
          });
      });
    }
    else {
      return this.httpClient.post<Anagrafica[]>(`${this.anagraficaUrl}`, anagraficaData).pipe(
        catchError(e => { throw (e) })
      );
    }

  }

  editAnagrafica(anagraficaData: Anagrafica){
    if (this.platform.is('hybrid')) {
      
      const options = {
        url: `${this.anagraficaUrl}`,
        method: 'PUT',
        data: anagraficaData,
        headers: {
          'Accept': 'application/json',
          'Content-Type' : "application/json"
        }
      };
      
        return new Observable((observer) => {
          /* console.log("Send src:" ,options) */
          CapacitorHttp.put(options)
          .then(response => {
          /*   console.log("Response src:" ,response) */
            observer.next(response.data);
            observer.complete(); 
          })
          .catch(error => {
            console.log("Error: " , error)
            observer.error(error); 
          });
        });
    }
    else {
      return this.httpClient.put<Anagrafica>(`${this.anagraficaUrl}`, anagraficaData).pipe(
        catchError(e => { throw (e) })
      );
    }

  }

  
  eliminaAnagrafica(id: string) {
    if (this.platform.is('hybrid')) {

      const options = {
        url: `${this.anagraficaUrl}/${id}`,
        method: 'DELETE'
      };

      return new Observable((observer) => {
        CapacitorHttp.delete(options)
        .then(response => {
          observer.next(response.data);
          observer.complete(); 
        })
        .catch(error => {
          console.log("Error: " , error)
          observer.error(error); 
        });
      });
    }
    else {
      return this.httpClient.delete<Anagrafica>(`${this.anagraficaUrl}/${id}`).pipe(
        catchError(e => { throw (e) })
      );
    }
  }
}
