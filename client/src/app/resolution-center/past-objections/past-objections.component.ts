import { Component, OnInit } from '@angular/core';

import { ResolutionCenterService } from '../resolution-center.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-past-objections',
  templateUrl: './past-objections.component.html',
  styleUrls: ['./past-objections.component.css']
})
export class PastObjectionsComponent implements OnInit {
  public objections;

  constructor(private resolutionCenterService: ResolutionCenterService, private userService: UserService) {}

  ngOnInit() {
    this.init();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
  }

  private init() {
    this.resolutionCenterService.getPastObjections().subscribe((response) => {
      this.objections = response.objections;
    });
  }
}
