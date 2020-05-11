import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getDirectory(): Observable<any> {
    return this.http.get(BACKEND_URL + '/api/directory');
  }

  //
  public getDocuments(): Observable<any> {
    return this.http.get(BACKEND_URL + '/api/documents');
  }
 //
  public getRules(): Observable<any> {
    return this.http.get(BACKEND_URL + '/api/rules');
  }
}
