import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
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

  ngOnInit() {}
}
