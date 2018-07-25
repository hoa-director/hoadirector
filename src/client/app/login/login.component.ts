import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: {username: string; password: string;} = {username: '', password: ''};

  constructor(
    private userService: UserService,
  ) { };

  ngOnInit() {
  };

  login(user): void {
    this.userService.login(user).subscribe(() => {
      console.log('success');
    })
  }
}
