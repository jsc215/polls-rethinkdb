import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit, OnDestroy {
  polls = [];
  connection;

  constructor(private dataService: DataService, private socketService: SocketService) {}

  ngOnInit() {
    this.getPolls();
    this.connection = this.socketService.getVotes().subscribe(vote => {
      // console.log('received vote', vote);
      for (let i = 0; i < this.polls.length; i++) {
        if (this.polls[i].id === vote['id']) {
          this.polls[i].polls = vote['polls'];
        }
      }
      // console.log(this.polls);
    });
  }

  getPolls() {
    this.dataService.getAllPolls().subscribe((poll) => {
      const polls = Array.from((this.polls = poll['data'].map((mapPolls) => mapPolls)));
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
