import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-request-password-change',
  templateUrl: './request-password-change.component.html',
  styleUrls: ['./request-password-change.component.scss']
})
export class RequestPasswordChangeComponent implements OnInit {

  email: string = '';
  message: string = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  requestToken(email) {
    this.userService.requestToken(email).subscribe(
      response => {
        console.log(response);
        this.message = `An email was sent to ${email} with a link to reset your password`
      },
      error => {
        console.error(error);
        this.message = 'There was a server error. Please try again later'
      }
    );
  }
}
