import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { OrdemCompraService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service/notificacao.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  public id;
  public reason;
  private subscription: Subscription;
  public eventClick = false;
  public orderBuy$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private ordemCompraService: OrdemCompraService
  ) { }

  ngOnInit() {
    this.obterId();
    this.getOrderBuy();
  }

  obterId() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.id = params['id']);
  }

  getOrderBuy() {
    this.orderBuy$ = this.ordemCompraService.getOrderBuy(this.id);
  }

  sucessoNotification() {
    this.notificacaoService.notificarSucesso(
      'Produto editado com sucesso',
      ''
    );
  }

  falhaNotification() {
    this.notificacaoService.notificarErro(
      'Não foi possível editar o produto',
      ''
    );
  }

  editOrderBuy() {
    if (!this.eventClick) {
      this.eventClick = true;
      this.orderBuy$ = this.ordemCompraService
      .updateOrderBuy(this.id, this.reason)
      .map(res => {
        if (res) {
          this.sucessoNotification();
        } else {
          this.falhaNotification();
          this.eventClick = false;
        }
        return res;
      });
    }
  }

}
