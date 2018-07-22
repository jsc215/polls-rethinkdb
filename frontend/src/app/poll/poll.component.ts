import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  polls = [];
  poll;
  socket;
  // option;
  // value;
  selected: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.poll = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.dataService.getPoll(params.get('id')))
    );
  }

  onVote(poll) {
    // this.router.navigate(['/polls']);
    let socket;
    socket = io.connect('http://localhost:3000');
    const updatedPoll = {
      id: this.route.params['value']['id'],
      option: poll.option
    };
    socket.on('changeFeed', function(data) {
      if (this.updatedPoll === data.id) {
        this.updatedPoll = data;
      }
    });
    this.dataService.updatePoll(updatedPoll).subscribe();
  }
}
// for (let pollCounter = 0; pollCounter < ; pollCounter++) {
//   if (this.polls[pollCounter].polls === data.id) {
//     this.polls[pollCounter].polls = data.poll
