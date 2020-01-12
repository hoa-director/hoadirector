import { Component, OnInit } from '@angular/core';
import { ResolutionCenterService } from '../resolution-center.service';
import { UserService } from 'client/app/services/user.service';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent implements OnInit {
  public objections;

  constructor(private resolutionCenterService: ResolutionCenterService, private userService: UserService) {}

  ngOnInit() {
    this.init();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
  }

  private init() {
    this.resolutionCenterService.getOutbox().subscribe((response) => {
      this.objections = response.objections;
    });
  }
}
