import { ProdutoService } from 'app/shared/services';
import { Produto } from './../../../../models/produto.interface';
import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-modal-imagem',
  templateUrl: './modal-imagem.component.html',
  styleUrls: ['./modal-imagem.component.scss']
})
export class ModalImagemComponent implements OnInit {

  @Input()
  produtoSalvo: Produto;
  public uploadedImage = false;
  public load = false;

  constructor(
    public modalAtiva: NgbActiveModal,
    public produtoService: ProdutoService,
  ) { }

  ngOnInit() { }

  fecharModal() {
    this.modalAtiva.close({ close: true });
  }

  upload(event) {
    this.load = true;
    if (event.target.files && event.target.files['0']) {
      const file = event.target.files['0'];
      const formData: FormData = new FormData();
      formData.append('file', file);
      this.produtoService.uploadProductImage(formData, this.produtoSalvo._id)
        .subscribe(res => {
          if (res) {
            this.uploadedImage = true;
            this.load = false;
            this.fecharModal();
          }
        });

    }
  }
}
