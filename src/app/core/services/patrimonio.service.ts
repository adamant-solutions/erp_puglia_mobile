import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Patrimonio} from '../models/patrimonio.model';
import {catchError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  constructor(private http: HttpClient, @Inject('patrimonioUrl') private patrimonioUrl: string,) {
  }

  getPatrimonioData(): Observable<Patrimonio[]> {
    return this.http.get<Patrimonio[]>(`${this.patrimonioUrl}`)
      .pipe(
        catchError(error => {
          return of(error);
        })
      );
  }
}
