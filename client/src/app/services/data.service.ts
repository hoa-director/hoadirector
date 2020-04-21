import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getDirectory() {
    return this.http.get(BACKEND_URL + '/api/directory');
  }

  //
  public getDocuments() {
    return this.http.get(BACKEND_URL + '/api/documents');
  }
 //
  public getRules() {
    return this.http.get(BACKEND_URL + '/api/rules');
  }
}
