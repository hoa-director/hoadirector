import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolutionCenterService {

  constructor(
    private http: HttpClient,
  ) { }

  public getObjections(): Observable<{}> {
    return this.http.get('/api/objections');
  }
}
