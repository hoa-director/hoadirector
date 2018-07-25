import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(user) {
    console.log("loging in the following user: ", user);
    return of(true);
  }
}
