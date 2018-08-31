import { Injectable } from '@angular/core';
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
    return this.http.post('/user/login', user).pipe(
      tap(
        user => {
          this.user = user;
          return 'success';
        },
      )
    )
  }

  getUser() {
    if (!this.user) {
      this.http.get('/user').subscribe(
        user => {
          console.log(user);
          this.user = user;
          return true;
        },
        error => {
          console.log(error);
          return false;
        }
      )
    }
    return this.user;
  }
  
  isLoggedIn(): boolean {
    return this.getUser();
  }
}
