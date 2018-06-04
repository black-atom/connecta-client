import { CepService } from './../../../../../../shared/services/cep-service/cep.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { equipamentosTemporarios } from './../../equipamento.mock.temp';
import { DadosEndereco } from '../../../../../../models';

@Component({
  selector: 'app-form-equip',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent implements OnInit {

  @Input()
  indexProposta;

  @Output()
  sendEquipamento = new EventEmitter();

  public formEquipamento: FormGroup;
  public equips = equipamentosTemporarios;
  private mascaraCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];


  constructor(
    private fb: FormBuilder,
    private cepService: CepService
  ) { }

  ngOnInit() {
    this.equipamentoForm();
  }

  selecionarEquipamento(equipamento) {
    this.formEquipamento.get('modelo').patchValue(equipamento.modelo);
    this.formEquipamento.get('fabricante').patchValue(equipamento.fabricante);
  }

  salvarEquipamento() {
    const indexProposta = this.indexProposta;
    const equipamento = this.formEquipamento.value;
    this.sendEquipamento.emit({ equipamento, indexProposta });
  }

  adicionarEquipamento() {
    this.sendEquipamento.emit(this.formEquipamento.value);
  }

  buscaPorCep(cep: string) {
    const enderecoForm = this.formEquipamento.get('endereco');
    this.cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
        enderecoForm.get('rua').patchValue(dados.logradouro);
        enderecoForm.get('bairro').patchValue(dados.bairro);
        enderecoForm.get('cidade').patchValue(dados.localidade);
        enderecoForm.get('uf').patchValue(dados.uf);
    });
  }

  equipamentoForm() {
    this.formEquipamento = this.fb.group({
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      numero_serie: ['', [Validators.required, Validators.minLength(4)]],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        numero: ['', Validators.required],
        cidade: ['', Validators.required],
        complemento: [''],
        uf: ['', Validators.required],
        ponto_referencia: ['']
      })
    });
  }

}
