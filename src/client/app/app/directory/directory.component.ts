import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  units: { addressLineOne: string; addressLineTwo?: string; city: string; state: string; zip: number; user: {email: string; phone: string; fullName: string;} }[];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getDirectory().subscribe((response: any) => {
      this.units = response.units;
    })
  }

}
