import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelper } from '../../../../../node_modules/angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import { LoginService } from '../../services';


@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModal {
  @Input() message;
  public password: string = '';
  private jwtHelper: JwtHelper = new JwtHelper();
  public invalidPassword = '';

  constructor(
    public activeModal: NgbActiveModal,
    private loginService: LoginService
  ) {}

  getUsername() {
    const token = localStorage.getItem('token');
    const { login: { username } } = this.jwtHelper.decodeToken(token)._doc;
    return username;
  }

  confirm() {
    this.loginService.logar({
      username: this.getUsername(),
      password: this.password
    })
      .toPromise()
      .then(() => this.activeModal.close(true))
      .catch(() => this.invalidPassword = 'Senha Invalida');
  }
}
