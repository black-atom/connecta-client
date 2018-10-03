import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotificacaoService {

  constructor(private _notificacaoService: NotificationsService) { }

  notificarSucesso(titulo: string, mensagem: string) {
    this._notificacaoService.success(
      titulo, mensagem,
      {
        timeOut: 1800,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
    );
  }

  notificarErro(titulo: string, mensagem: string) {
    this._notificacaoService.error(
      titulo, mensagem,
      {
        timeOut: 1800,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 70
      }
    );
  }

  notificarAviso(titulo: string, mensagem: string) {
    this._notificacaoService.warn(
      titulo, mensagem,
      {
        timeOut: 1800,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
    );
  }
}
