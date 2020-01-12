import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-association-switch',
  templateUrl: './association-switch.component.html',
  styleUrls: ['./association-switch.component.scss']
})
export class AssociationSwitchComponent implements OnInit, OnDestroy {

  subscriptions = [];
  associations: {}[] = [];
  currentAssociation: number;

  constructor(
    public userService: UserService,
    private location: Location,
    ) { }

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

  private init() {
    this.userService.getUserAssociations().subscribe(
      ({associations, currentAssociation}: any) => {
        this.associations = associations;
        this.currentAssociation = currentAssociation;
      },
      () => {
        this.associations = [];
      }
    );
  }

  selectAssociation(associationId) {
    this.userService.selectAssociation(associationId).subscribe(
      ({associations, currentAssociation}: any) => {
        this.associations = associations;
        this.currentAssociation = currentAssociation;
        const url = this.location.path();
        this.location.go(url);
      }
    );
  }

}
