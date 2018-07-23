import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  polls;
  poll;
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
    this.router.navigate(['/polls']);
    const updatedPoll = {
      id: this.route.params['value']['id'],
      option: poll.option
    };
    this.dataService.updatePoll(updatedPoll).subscribe();
  }
}
