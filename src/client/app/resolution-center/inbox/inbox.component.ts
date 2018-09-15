import { Component, OnInit } from '@angular/core';
import { ResolutionCenterService } from '../resolution-center.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public objections: any[] = [];

  constructor(
    private resolutionCenterService: ResolutionCenterService,
  ) { }

  ngOnInit() {
    this.resolutionCenterService.getObjections().subscribe(response => {
      this.objections = response.objections;
    });
  }

}
