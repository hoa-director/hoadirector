import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  
  rules: any = [];
  currentRuleList: any;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getRules().subscribe(response => {
      this.rules = response;
    });
  }

  selectRuleList(ruleList) {
    this.currentRuleList = ruleList;
  }

}
