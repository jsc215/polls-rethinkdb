import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  sendVote(vote) {
    this.socket.emit('changeFeed', vote);
  }

  getVotes() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('changeFeed', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
