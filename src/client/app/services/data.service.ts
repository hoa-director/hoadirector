import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  public getDirectory() {
    return this.http.get('/api/directory');
  }

  public getDocuments() {
    return this.http.get('api/documents');
  }
}
