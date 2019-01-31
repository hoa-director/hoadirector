import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user;

  constructor(private http: HttpClient) {}

  login(user): Observable<string> {
    return this.http.post('/user/login', user).pipe(
      tap((userData) => {
        this.user = userData;
        return 'success';
      }),
    ) as Observable<string>;
  }

  getUser(): Observable<{}> {
    if (!this.user) {
      return this.http.get('/user').pipe(
        tap(
          (user) => {
            this.user = user;
            return this.user;
          }
        ),
      );
    } else {
      return of(this.user);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(
      tap(
        user => {
          return !!user;
        }
      )
    ) as Observable<boolean>;
  }

  getUserAssociations(): Observable<any> {
    return this.getUser().pipe(user => {
      if (!user) {
        return of({});
      }
      return this.http.get('/user/associations');
    });
  }
}
