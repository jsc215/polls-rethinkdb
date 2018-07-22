import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
   }

  getAllPolls() {
    return this.http.get('/api/polls');
  }

  getPoll(id) {
     return this.getAllPolls().pipe(map(polls => polls['data'].find(poll => poll.id === id)));
  }

  addPoll(newPoll) {
    return this.http.post('/api/polls', newPoll, httpOptions);
  }

  updatePoll(updatedPoll) {
    return this.http.put('api/polls', updatedPoll, httpOptions);
  }
}
