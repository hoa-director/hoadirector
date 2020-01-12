import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  rules: any = [];
  currentRuleList: any;

  constructor(private dataService: DataService, private userService: UserService) {}

  ngOnInit() {
    this.init();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
  }

  selectRuleList(ruleList) {
    this.currentRuleList = ruleList;
  }

  init() {
    this.dataService.getRules().subscribe((response) => {
      this.rules = response;
    });
  }
}
