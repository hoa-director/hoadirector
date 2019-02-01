import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user;
  currentAssociation;
  currentAssociationUpdated: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {}

  setCurrentAssociation(id) {
    this.currentAssociation = id;
    this.currentAssociationUpdated.emit(this.currentAssociation);
  }

  login(user): Observable<string> {
    return this.http.post('/user/login', user).pipe(
      tap((userData) => {
        this.user = userData;
        return 'success';
      }),
    ) as Observable<string>;
  }

  getUser() {
    if (!this.user) {
      return this.http.get('/user').pipe(
        catchError((error) => {
          console.log('error getting user: ', error);
          return of(false);
        })
      )
    } else {
      return of(this.user);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser()
    .pipe(
      map((user) => {
        console.log('user', user);
        return !!user;
      })
    );
  }

  getUserAssociations(): Observable<any> {
    return this.getUser().pipe(user => {
      if (!user) {
        return of({});
      }
      return this.http.get('/user/associations');
    });
  }

  selectAssociation(associationId) : Observable<any> {
    return this.getUser().pipe(user => {
      if (!user) {
        return of({});
      }
      return this.http.post('/user/associations/', {associationId}).pipe(
        tap(({currentAssociation}) => {
          this.setCurrentAssociation(currentAssociation);
        })
      )
    });
  }
}
