import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getDirectory() {
    return this.http.get('/api/directory');
  }

  //
  public getDocuments() {
    return this.http.get('/api/documents');
  }
 //
  public getRules() {
    return this.http.get('/api/rules');
  }
}
