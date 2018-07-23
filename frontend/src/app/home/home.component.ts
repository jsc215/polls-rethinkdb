import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  polls;
  poll;
  selectedId;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getPolls();
  }

  getPolls() {
    this.dataService.getAllPolls().subscribe((poll) => {
      const polls = Array.from((this.polls = poll['data'].map((mapPolls) => mapPolls)));
    });
  }
}
