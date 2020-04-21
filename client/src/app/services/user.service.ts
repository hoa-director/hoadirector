import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user;
  userUpdated: EventEmitter<string> = new EventEmitter();
  currentAssociation;
  currentAssociationUpdated: EventEmitter<string> = new EventEmitter();


  constructor(private http: HttpClient, private router: Router) {}

  setCurrentAssociation(id) {
    this.currentAssociation = id;
    this.currentAssociationUpdated.emit(this.currentAssociation);
  }

  setUser(user) {
    this.user = user;
    this.userUpdated.emit(user);
  }

  login(user): Observable<string> {
    return this.http.post(BACKEND_URL + '/user/login', user).pipe(
      tap((userData) => {
        this.setUser(userData);
        return 'success';
      }),
    ) as Observable<string>;
  }

  logout() {
    return this.http.get(BACKEND_URL + '/users/logout').pipe(
      tap(() => {
        this.setUser(undefined);
        this.router.navigate(['/login']);
      }),
    );
  }

  getUser() {
    if (!this.user) {
      return this.http.get(BACKEND_URL + '/user').pipe(
        tap(user => {
          this.setUser(user);
        }),
        catchError((error) => {
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
        return !!user;
      })
    );
  }

  getUserAssociations(): Observable<any> {
    return this.getUser().pipe(user => {
      if (!user) {
        return of({});
      }
      return this.http.get(BACKEND_URL + '/user/associations');
    });
  }

  selectAssociation(associationId) : Observable<any> {
    return this.getUser().pipe(user => {
      if (!user) {
        return of({});
      }
      return this.http.post(BACKEND_URL + '/user/associations/', {associationId}).pipe(
        tap(({currentAssociation}) => {
          this.setCurrentAssociation(currentAssociation);
        })
      )
    });
  }

  requestToken(email) {
    return this.http.get(BACKEND_URL + '/users/forgotten', {
      params: {
        email
      }
    });
  }

  changeForgottenPassword({password, token}) {
    return this.http.post(BACKEND_URL + '/users/forgotten', {password, token});
  }
}
