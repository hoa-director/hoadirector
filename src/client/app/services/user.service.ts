import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;

  constructor(
    private http: HttpClient
  ) { }

  login(user) {
    console.log("loging in the following user: ", user);
    return this.http.post('/user/login', user).pipe(
      tap(
        user => {
          this.user = user;
          return 'success';
        },
      )
    )
  }
  
  isLoggedIn() {
    if (!this.user) {
      return false;
    }
    return true;
  }
}
