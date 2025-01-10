import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Patrimonio } from '../models/patrimonio.model';
import { catchError, from, Observable, of, switchMap } from 'rxjs';
import { PatrimonioSearchParams } from '../resolvers/patrimonio.resolver';
import { Platform } from '@ionic/angular';
import { CapacitorHttp } from '@capacitor/core';
import { HttpWrapperService } from './http-wrapper.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {
    constructor(
      private http: HttpClient,
      @Inject('patrimonioUrl') private patrimonioUrl: string,
      private platform: Platform,
      private httpWrapper: HttpWrapperService,
      private authService: AuthorizationService
    ) {}
  
    getPatrimonioData(params: PatrimonioSearchParams): Observable<any> {
      /* return from(this.authService.ensureTokenIsValid(false)).pipe(
        switchMap(token => { */
          let httpParams = new HttpParams()
            .set('pagina', (params.pagina || 0).toString());
  
          if (params.zona) {
            httpParams = httpParams.set('zona', params.zona);
          }

          if (params.comune) {
            httpParams = httpParams.set('comune', params.comune);
          }
  
          if (this.platform.is('hybrid')) {
            const options = {
              url: this.patrimonioUrl,
              method: 'GET',
              /* headers: {
                'Authorization': `${token.token_type} ${token.access_token}`,
              }, */
              params: this.convertParams(httpParams)
            };
  
            return from(this.httpWrapper.request(options));
          } else {
            return this.http.get<Patrimonio[]>(this.patrimonioUrl, {
              params: httpParams,
              observe: 'response'
               /* headers: {
                'Authorization': `${token.token_type} ${token.access_token}`
              }  */
            }).pipe(
              catchError(error => { throw error; })
            );
          }
       // })
    //  );
    }  

  getPatrimonioById(id: string){
    return this.http.get<Patrimonio>(`${this.patrimonioUrl}/${id}`).pipe(
      catchError(e => { throw (e) }));
  }


   
  addPatrimonio(patrimonioData: Patrimonio) {
    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.patrimonioUrl}`,
        method: 'POST',
        data: patrimonioData,
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
      return this.http.post<Patrimonio[]>(`${this.patrimonioUrl}`, patrimonioData).pipe(
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
