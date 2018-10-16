import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';

import { ProdutoDisponivelService, NotificacaoService } from './../../../../shared/services';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit, OnDestroy {

  public id;
  public reason;
  private subscription: Subscription;
  public eventClick = false;
  public produtoDisponivelForm: FormGroup;
  private productAvailable;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private notificacaoService: NotificacaoService,
    private produtoDisponivelService: ProdutoDisponivelService
  ) { }

  ngOnInit() {
    this.obterId();
    this.initForm();
    this.getProductAvailable();
  }

  initForm() {
    this.produtoDisponivelForm = this.fb.group({
      description: ['', Validators.required],
      serialNumber: ['', Validators.required]
    });
  }

  obterId() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.id = params['id']);
  }

  getProductAvailable() {
    this.subscription = this.produtoDisponivelService
      .getProdutoByID(this.id)
      .subscribe(product => {
        this.produtoDisponivelForm.get('description').patchValue(product.description);
        this.produtoDisponivelForm.get('serialNumber').patchValue(product.serialNumber);
        this.productAvailable = product;
      });
  }

  sucessoNotification() {
    this.notificacaoService.notificarSucesso(
      'Produto editado com sucesso',
      ''
    );
  }

  falhaNotification(msg) {
    this.notificacaoService.notificarErro(
      msg,
      ''
    );
  }

  editProductAvaiable(serialNumber) {
    if (!this.eventClick) {
      this.eventClick = true;
      if (serialNumber !== this.productAvailable.serialNumber) {
        this.subscription = this.produtoDisponivelService
        .updateProductAvailable(this.id, { serialNumber })
          .subscribe(res => {
            if (res) {
              this.sucessoNotification();
            } else {
              this.eventClick = false;
            }
            return res;
          },
          erro => this.falhaNotification('Não foi possível editar o produto'));
      }else {
        this.eventClick = false;
        this.falhaNotification('O número de série está igual o atual');
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
