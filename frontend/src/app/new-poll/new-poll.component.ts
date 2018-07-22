import { DataService } from '../data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent  {
  question = '';
  option = '';
  option2 = '';
  option3 = '';
  vote: number;

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  onSubmit(form: NgForm) {
    const newPoll = {
      question: this.question,
      polls: [
        {
          option: this.option, vote: 0
        },
        {
          option: this.option2,
          vote: 0
        },
        {
          option: this.option3,
          vote: 0
        }
      ]
    };
    this.dataService.addPoll(newPoll).subscribe();
    this.router.navigate(['/']);
  }
}
