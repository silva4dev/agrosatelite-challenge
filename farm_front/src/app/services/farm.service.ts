import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Farm } from './../models/Farm'

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  baseUrl = "http://localhost:3000/farms";

  constructor(private http: HttpClient) { }

  create(farm: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, farm);
  }

  read(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  update(farm: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${farm.id}`, farm);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  list(): Observable<Farm[]> {
    return this.http.get<Farm[]>(`${this.baseUrl}`);
  }
}


