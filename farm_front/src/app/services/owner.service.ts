import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Owner } from '../models/Owner';

@Injectable({
    providedIn: 'root',
})
export class OwnerService {
    baseUrl = "http://localhost:3000/owners";

    constructor(private http: HttpClient) { }

    list(): Observable<Owner[]> {
        return this.http.get<Owner[]>(`${this.baseUrl}`);
    }
}



