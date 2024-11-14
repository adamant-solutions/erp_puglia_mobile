import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patrimonio } from '../models/patrimonio.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  constructor(private http: HttpClient) { }

  getPatrimonioData(): Observable<Patrimonio[]> {
    const url = ''; //'https://api.example.com/data';
    return this.http.get<Patrimonio[]>(url)
        .pipe(
            catchError(error => {
                return of([]);
            })
        );
}
}
