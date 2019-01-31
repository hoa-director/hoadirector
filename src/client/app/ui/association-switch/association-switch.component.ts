import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-association-switch',
  templateUrl: './association-switch.component.html',
  styleUrls: ['./association-switch.component.css']
})
export class AssociationSwitchComponent implements OnInit {

  associations: {}[];
  currentAssociation: number;

  constructor(
    public userService: UserService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.init();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
  }

  private init() {
    this.userService.getUserAssociations().subscribe(({associations, currentAssociation}: any) => {
      this.associations = associations;
      this.currentAssociation = currentAssociation;
    });
  }

  selectAssociation(associationId) {
    this.userService.selectAssociation(associationId).subscribe(({associations, currentAssociation}: any) => {
      this.associations = associations;
      this.currentAssociation = currentAssociation;
      const url = this.location.path();
      this.location.go(url);
    });
  }

}
