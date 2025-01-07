import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Patrimonio } from '../models/patrimonio.model';
import { catchError, Observable, of } from 'rxjs';
import { PatrimonioSearchParams } from '../resolvers/patrimonio.resolver';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  constructor(private http: HttpClient, @Inject('patrimonioUrl') private patrimonioUrl: string,) {
  }

  getPatrimonioData(params: PatrimonioSearchParams): Observable<Patrimonio[]> {
    let httpParams = new HttpParams().set('pagina', (params.pagina || 0).toString())

    if (params.zona) {
        httpParams = httpParams.set('zona', params.zona);
    }
   
    const paramsForCapacitor = httpParams.keys().reduce((acc : any, key) => {
        acc[key] = httpParams.getAll(key)
;
        return acc;
    }, {} as {[key: string]: string});

    return this.http.get<Patrimonio[]>(`${this.patrimonioUrl}`,{ params: httpParams })
      .pipe(
        catchError(error => {
          return of(error);
        })
      );
  }

  getPatrimonioById(id: string){
    return this.http.get(`${this.patrimonioUrl}/${id}`).pipe(
      catchError(e => { throw (e) }));
  }
}
