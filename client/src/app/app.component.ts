import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  onInit() {
    this.userService.isLoggedIn().subscribe((user) => {
      this.isLoggedIn = true;
    });
  }
}
