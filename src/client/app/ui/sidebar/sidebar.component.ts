import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {

  userIsLoggedIn: boolean = false;
  subscriptions = [];

  links: Array<{ path: string; label: string }> = [
    {
      path: 'directory',
      label: 'Neighborhood Directory',
    },
    {
      path: 'rules',
      label: 'Rules & Regulations',
    },
    {
      path: 'resolution-center',
      label: 'Resolution Center',
    },
    {
      path: 'financials',
      label: 'Financials',
    },
    {
      path: 'documents',
      label: 'Association Documents',
    },
    {
      path: 'exterior',
      label: 'Exterior Maintenance',
    },
    {
      path: 'interior',
      label: 'Interior Mainenance',
    },
    {
      path: 'board',
      label: 'Board of Directors',
    },
    {
      path: 'notes',
      label: 'Meeting Notes',
    },
    {
      path: 'profile',
      label: 'Edit Profile',
    },
  ];

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.init();
    const associationSubscription = this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
    const userSubscription = this.userService.userUpdated.subscribe(() => {
      this.init();
    });
    this.subscriptions.push(associationSubscription, userSubscription);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.map(subscription => {
      subscription.unsubscribe();
    });
  }

  init() {
    this.userIsLoggedIn = this.userService.user;
  }

  logout() {
    console.log('logout clicked');
    this.userService.logout().subscribe();
  }
}
