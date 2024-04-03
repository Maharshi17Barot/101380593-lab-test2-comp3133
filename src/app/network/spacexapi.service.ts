import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root',
})
export class SpacexapiService {
  private url = 'https://api.spacexdata.com/v3/launches';

  getColours(): Observable<string[]> {
    return of(['blue', 'green', 'red']);
  }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.url);
  }

  getMission(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.url}/${id}`);
  }

  constructor(private http: HttpClient) {}
}
