import { Observable } from 'rxjs/Rx';
import { Funcionario } from './../../../models/funcionario.interface';
import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../../../shared/services';

@Component({
  selector: 'ba-msg-center',
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter implements OnInit {

  public notifications;
  private jwtHelper: JwtHelper = new JwtHelper();
  public countNotifications = 0;

  constructor(private _baMsgCenterService: NotificationsService) {
    this._baMsgCenterService.getAllNotifications().subscribe(res => this.notifications = res);
  }

  ngOnInit() {
    this.getFuncionario();
  }

  getFuncionario() {
    const token = localStorage.getItem('token');
    const user = this.jwtHelper.decodeToken(token)._doc;
    if (user) {
      return this._baMsgCenterService.sendUser({ id: user._id, name: user.nome });
    }
    return this.getFuncionario();
  }
}
