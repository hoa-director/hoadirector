import { Component, OnInit } from '@angular/core';
import { ResolutionCenterService } from '../resolution-center.service';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {

  public objections;

  constructor(
    private resolutionCenterService: ResolutionCenterService,
  ) { };

  ngOnInit() {
    this.resolutionCenterService.getOutbox().subscribe(response => {
      this.objections = response.objections;
    });
  };

};
