import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  people: { name: string; addressLine1: string; addressLine2?: string; city: string; state: string; zip: number; email: string; phone: string }[] = [
    {
      name: 'Greg Jablonski',
      addressLine1: '12345 Fake Dr N',
      city: 'Hastings',
      state: 'MN',
      zip: 55033,
      email: 'greg@fake.com',
      phone: '612-555-5555',
    },
    {
      name: 'Jeff Johnson',
      addressLine1: '12346 Fake Dr N',
      city: 'Hastings',
      state: 'MN',
      zip: 55033,
      email: 'jeff@fake.com',
      phone: '612-555-5556',
    },
    {
      name: 'Henry Smith',
      addressLine1: '12347 Fake Dr N',
      city: 'Hastings',
      state: 'MN',
      zip: 55033,
      email: 'henry@fake.com',
      phone: '612-555-5557',
    },
    {
      name: 'Sarah Williams',
      addressLine1: '12348 Fake Dr N',
      city: 'Hastings',
      state: 'MN',
      zip: 55033,
      email: 'sarah@fake.com',
      phone: '612-555-5558',
    },
    {
      name: 'Suzy Schrock',
      addressLine1: '12349 Fake Dr N',
      city: 'Hastings',
      state: 'MN',
      zip: 55033,
      email: 'suzy@fake.com',
      phone: '612-555-5559',
    },
    {
      name: 'Hannah Topp',
      addressLine1: '12350 Fake Dr N',
      city: 'Hastings',
      state: 'MN',
      zip: 55033,
      email: 'hannah@fake.com',
      phone: '612-555-5560',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
