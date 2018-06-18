import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class NotificationsService {

  private endpointApi = 'http://localhost:3000';
  private socket;

  constructor(private http: Http) {
    this.socket = io(this.endpointApi);
  }

  postNotification(notification): Observable<any> {
    const urlApi = `${this.endpointApi}/api/notifications`;
    return this.http
      .post(urlApi, notification)
      .map(res => res.json() as any);
  }

  sendUser(user) {
    this.socket.emit('new-user-connected', user);
  }

  getNotifications() {
    const observable = new Observable(observer => {
      this.socket.on('notification', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  getAllNotifications() {
    const observable = new Observable(observer => {
      this.socket.on('getNotifications', data => {
        observer.next(data);
      });
    });
    return observable;
  }
}
