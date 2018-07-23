import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  polls;
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
