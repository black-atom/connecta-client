import { FuncionarioService } from './../../../../shared/services/funcionario-service/funcionario.service';
import { Observable } from 'rxjs';
import { AtendimentoService } from './../../../../shared/services/atendimento-service/atendimento.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoReservadoService } from '../../../../shared/services';
import { parseDataBR } from 'app/shared/utils/StringUtils';

@Component({
  selector: 'app-liberar-produto',
  templateUrl: './liberar-produto.component.html',
  styleUrls: ['./liberar-produto.component.scss']
})
export class LiberarProdutoComponent implements OnInit {


  date = new Date();
  inputDate = {
    year: this.date.getFullYear(),
    day: this.date.getDate(),
    month: this.date.getMonth() + 1
  };

  productsAvailables$: Observable<any[]>;

  tecnicoSelecionado;

  public myDatePickerOptions = { dateFormat: 'dd/mm/yyyy' };

  constructor(
    private produtoReservadoService: ProdutoReservadoService,
    private atendimentoService: AtendimentoService,
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit() {


  }

  getReservedProducts() {
    const parseDate = `${this.inputDate.year}-${this.inputDate.month}-${this.inputDate.day}T03:00:00.000Z`;

    this.productsAvailables$ =
    this.funcionarioService
      .retornarFuncionarioPorFuncao({ 'login.tipo': 'tecnico' })
      .switchMap(({ funcionarios }) => {
        return this.produtoReservadoService
        .getProductsReserved({ dateOut: parseDate })
        .switchMap(productsReserved =>
          this.atendimentoService
            .getAtendimentosPorData({ data_atendimento: parseDate })
            .map(({ atendimentos }) =>
              productsReserved.map(productReserved => {
                const findOriginID = atendimentos.find(atendimento => atendimento._id === productReserved.originID);
                if (findOriginID) {
                  return { ...productReserved, cliente: findOriginID.cliente, tecnico: findOriginID.tecnico };
                }
                return productReserved;
              })
            )
        ).map(productsReserved => {
          const funcionariosFormatted =
          funcionarios.map(funcionario => {
            const findProductFunc = productsReserved
              .filter(product => product.tecnico && product.tecnico._id && product.tecnico._id === funcionario._id);
            if (findProductFunc.length > 0) {
              return { ...funcionario, productsReserved: findProductFunc };
            }
            return { ...funcionario, productsReserved: [] };
          })
          .filter(funcionario => funcionario.productsReserved.length > 0);
          this.tecnicoSelecionado = funcionariosFormatted.find(funcionario =>
            (this.tecnicoSelecionado && funcionario._id === this.tecnicoSelecionado._id)
          );
          return funcionariosFormatted;
        });
      });

  }

  liberarProduct(product) {
    const tecnicoAtual = this.tecnicoSelecionado;
    const productReserved = {
      _id: product._id,
      serialControl: product.serialControl,
      serialNumber: product.serialNumber,
      status: 'liberado',
      statusProductAvailable: 'baixado'
    };

    this.produtoReservadoService
      .putProductReserved(productReserved)
      .subscribe(res => this.getReservedProducts());
  }

  retornarProduct(product) {
    const tecnicoAtual = this.tecnicoSelecionado;
    const productReserved = {
      _id: product._id,
      serialControl: product.serialControl,
      serialNumber: product.serialNumber,
      status: 'estorno',
      statusProductAvailable: 'disponivel'
    };

    this.produtoReservadoService
      .putProductReserved(productReserved)
      .subscribe(res => this.getReservedProducts());
  }

  funcionarioEvent(product, status) {
    const tecnicoAtual = this.tecnicoSelecionado;
    let productReserved = {
      _id: product._id,
      status: 'técnico perdeu o item'
    };

    if (status === 'quebrou') {
      productReserved = {
        _id: product._id,
        status: 'técnico quebrou o item'
      };
    }

    this.produtoReservadoService
      .putProductReserved(productReserved)
      .subscribe(res => this.getReservedProducts());
  }

}
