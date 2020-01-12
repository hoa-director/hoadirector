import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'client/app/services/user.service';
import { ResolutionCenterService } from '../resolution-center.service';

@Component({
  selector: 'app-objection',
  templateUrl: './objection.component.html',
  styleUrls: ['./objection.component.scss'],
})
export class ObjectionComponent implements OnInit {
  message = '';
  objectionId: number;
  objection: {};
  canVote = false;
  results: {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private resolutionCenterService: ResolutionCenterService,
  ) {}

  ngOnInit() {
    this.init();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
  }

  init() {
    this.objectionId = +this.route.snapshot.paramMap.get('id');
    this.resolutionCenterService
      .getObjection(this.objectionId)
      .subscribe(
        (response: { objection: string; canVote: boolean; results: {} }) => {
          console.log(response);
          this.objection = response.objection;
          this.canVote = response.canVote;
          this.results = response.results;
        },
      );
  }

  vote(approved) {
    this.resolutionCenterService
      .submitVote({
        approved,
        objectionId: this.objectionId,
      })
      .subscribe(
        (response) => {
          this.canVote = false;
          this.message = 'Your vote has been recorded. Thank you for voting';
        },
        (error) => {
          console.log(error);
          this.message = 'A server error has occured. Please try again later';
        },
      );
  }
}
