import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  complaint: { against: string; message: string };

  constructor() {}

  ngOnInit() {
    this.complaint = { against: '', message: '' };
  }

  public submit() {
    return false;
  }
}
