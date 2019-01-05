import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  documents: Array<{ name: string; id: number }>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getDocuments().subscribe((response: any) => {
      this.documents = response;
    });
  }
}
