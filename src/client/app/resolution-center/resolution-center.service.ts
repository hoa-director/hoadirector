import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolutionCenterService {

  constructor(
    private http: HttpClient,
  ) { };

  public getObjections(): Observable<{objections: any[]}> {
    return this.http.get<{objections: any[]}>('/api/objections');
  };

  public getInbox(): Observable<{objections: any[]}> {
    return this.http.get<{objections: any[]}>('/api/inbox');
  };

  public getUnits(): Observable<{units: any[]}> {
    return this.http.get<{units: any[]}>('/api/units');
  };
  public submitObjection(objection) {
    return this.http.post('/api/objections', {objection});
  }
};
