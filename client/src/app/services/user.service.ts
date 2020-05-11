import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { response } from 'express';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user;
  userUpdated: EventEmitter<string> = new EventEmitter();
  currentAssociation;
  currentAssociationUpdated: EventEmitter<string> = new EventEmitter();

  private token: string;


  constructor(private http: HttpClient, private router: Router) {}

  setCurrentAssociation(id) {
    this.currentAssociation = id;
    this.currentAssociationUpdated.emit(this.currentAssociation);
  }

  setUser(user) {
    this.user = user;
    this.userUpdated.emit(user);
  } 

  loginUser(user): Observable<any> {
    return this.http.post<{token: string, user: any}>(BACKEND_URL + '/user/login', user)
    .pipe(
      tap((loginResponse) => {
        this.setUser(loginResponse.user);
        console.log(loginResponse.user);
        console.log(loginResponse.token);
        const token = loginResponse.token;
        this.token = token;
        return 'success';
      }),
    );
    // this.http.post(BACKEND_URL + '/user/login', user).subscribe(response => {
    // })
  }

  getToken() {
    return this.token;
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
      return this.http.get(BACKEND_URL + `/user/associations/?userId=${this.user.id}`);
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
