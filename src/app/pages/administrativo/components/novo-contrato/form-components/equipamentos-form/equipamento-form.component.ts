import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { CepService } from './../../../../../../shared/services/cep-service/cep.service';
import { equipamentosTemporarios } from './../../equipamento.mock.temp';
import { DadosEndereco } from '../../../../../../models';
import { NotificacaoService } from '../../../../../../shared/services';


@Component({
  selector: 'app-form-equip',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent implements OnInit, OnChanges {

  @Input()
  indexProposta;

  @Input()
  equipamento;

  @Input()
  indexEquipamento;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  sendEquipamento = new EventEmitter();

  public formEquipamento: FormGroup;
  public equips = equipamentosTemporarios;
  public mascaraCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public buttonEditar = false;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit() {
    this.equipamentoForm();
  }

  ngOnChanges(changes) {
    const formEquip = changes.equipamento.currentValue;
    if (formEquip !== undefined) {
    this.buttonEditar = true;

      this.formEquipamento.patchValue(formEquip);

    }
  }

  salvarEquipamento() {
    const indexProposta = this.indexProposta;
    const equipamento = this.formEquipamento.value;
    this.sendEquipamento.emit({ equipamento, indexProposta });
    this.resetForm();
    this.notificarAdicionadoSucesso();
  }

  editarEquipamento() {
    console.log(this.indexEquipamento, 'edit');
    console.log(this.equipamento, 'edit');
    this.buttonEditar = false;
    this.editEquipamento.emit({
      equipamento: this.formEquipamento.value,
      indexEquipamento: this.indexEquipamento,
      indexProposta: this.indexProposta
    });
    this.resetForm();
    this.notificarEditadoSucesso();
  }

  resetForm() {
    // this.indexEquipamento = null;
    // this.equipamento = null;
    this.equipamentoForm();
  }

  selecionarEquipamento(equipamento) {

    this.formEquipamento.get('modelo').patchValue(equipamento.modelo);
    this.formEquipamento.get('fabricante').patchValue(equipamento.fabricante);
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

  notificarAdicionadoSucesso() {
    this.notificacaoService.notificarSucesso('Produto adicionado com sucesso!', '');
  }

  notificarEditadoSucesso() {
    this.notificacaoService.notificarSucesso('Produto editado com sucesso!', '');
  }

}
