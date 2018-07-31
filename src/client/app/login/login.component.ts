import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: {email: string; password: string;} = {email: '', password: ''};

  message: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { };

  ngOnInit() {
  };

  login(user): void {
    this.userService.login(user).subscribe((response) => {
      this.router.navigateByUrl('/home');
    },
    error => {
      console.log(error);
      if(error.status === 401) {
        this.message = 'Username or password in incorrect.';
      }
    });
  }
}
