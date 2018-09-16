import { Component, OnInit } from '@angular/core';
import { ResolutionCenterService } from '../resolution-center.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public objections: any[] = [];

  public currentObjection;

  constructor(
    private resolutionCenterService: ResolutionCenterService,
  ) { };

  ngOnInit() {
    this.resolutionCenterService.getInbox().subscribe(response => {
      this.objections = response.objections;
    });
  };

  selectObjection(objection) {
    this.currentObjection = objection;
  }

  vote(approved) {
    this.resolutionCenterService.submitVote({
      approved, 
      objectionId: this.currentObjection.id
    }).subscribe(response => {
      console.log(response);
    });
  };

};
