import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class EditarComponent implements OnInit, OnDestroy {

  public id;
  public reason;
  private subscription: Subscription;

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
    console.log(this.reason)
    this.subscription = this.ordemCompraService
      .updateOrderBuy(this.id, this.reason)
      .subscribe(res => console.log(res));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
