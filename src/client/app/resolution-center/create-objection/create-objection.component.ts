import { Component, OnInit } from '@angular/core';
import { ResolutionCenterService } from '../resolution-center.service';

@Component({
  selector: 'app-create-objection',
  templateUrl: './create-objection.component.html',
  styleUrls: ['./create-objection.component.css']
})
export class CreateObjectionComponent implements OnInit {

  objection: {
    against: number;
    comment: string;
  };
  units: any[];

  constructor(
    private resolutionCenterService: ResolutionCenterService,
  ) { };

  ngOnInit() {
    this.objection = {
      against: 0,
      comment: '',
    }
    this.resolutionCenterService.getUnits().subscribe(response => {
      console.log(response);
      this.units = response.units;
    });
  };

  public submit(objection) {
    // console.log(objection);
    this.resolutionCenterService.submitObjection(objection).subscribe(response => {
      console.log(response);
    })
  };

};
