import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ClienteService } from '../../../../shared/services';
import { Cliente } from '../../../../models';
import { EQUIPAMENTOS } from '../../../../utils/mocks/equipamentos';

@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.scss']
})
export default class NovoContratoComponent implements OnInit {

  public novoContratoForm: FormGroup;
  public searchForm: FormGroup;
  public searchControl: FormControl;
  public cliente$: Observable<Cliente>;
  public equipamentos = EQUIPAMENTOS;
  public equipamentosSelecionados: string[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.initForm();
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges.subscribe(res => {
      this.equipamentos.filter(res);
    });
  }

  initForm() {
    this.novoContratoForm = this.fb.group({
      cnpj: '49.464.555/0001-83',
      numero: 'contrato'
    });
  }

  mask(valorDaLinha: string) {
    if (valorDaLinha === undefined) {
      valorDaLinha = '';
    }

    const valor = valorDaLinha.replace(/\D+/g, '');
    if (valor.length > 11) {
      return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    } else {
      return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
  }

  removerCaracterEspecial(cnpj: string) {
    return cnpj.replace(/\D+/g, '');
  }

  getCliente() {
    const cnpj = this.novoContratoForm.controls['cnpj'].value;
    this.cliente$ = this.clienteService
      .retornarUm(this.removerCaracterEspecial(cnpj));
  }


}
