import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-edicao',
  templateUrl: './modal-edicao.component.html',
  styleUrls: ['./modal-edicao.component.scss']
})
export class ModalEdicaoComponent implements OnInit {

  @Input()
  public equipamento;

  @Input()
  public showEncerradoEm;

  public labelModal: string;
  public labelMotivo: string;
  public labelButton: string;
  public editEquipamento: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modalInstance: NgbActiveModal,
    public config: NgbDatepickerConfig
  ) {
    config.minDate = { year: 1970, month: 1, day: 1 };
    config.maxDate = { year: 2070, month: 12, day: 31 };
  }

  initFormEquipamento() {
    this.editEquipamento = this.fb.group({
      motivo: ['', Validators.required],
      encerradoEm: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initFormEquipamento();
    this.changeForm();
  }

  changeForm() {
    switch (this.showEncerradoEm) {
      case true:
        this.labelModal = 'Remover Produto';
        this.labelMotivo = 'Motivo da Remoção';
        this.labelButton =  'Remover';
        break;
      case false:
        this.labelModal = 'Editar Produto';
        this.labelMotivo = 'Motivo da Editção';
        this.labelButton =  'Editar';
        this.editEquipamento.get('encerradoEm').disable();
        break;
    }
  }

  removerEquipamento(equipamento) {
    const parseEquipamento = this.parseEquipamento(equipamento);
    console.log(parseEquipamento);
    this.modalInstance.close(parseEquipamento);
  }

  closeModal(): void {
    this.modalInstance.close();
  }

  parseEquipamento(equipamento) {
    const parseEquipamento = {
      ...equipamento,
      motivo: this.editEquipamento.get('motivo').value,
      encerradoEm: this.parseDate(this.editEquipamento.get('encerradoEm').value)
    };
    return parseEquipamento;
  }

  parseDate(date) {
    if (date) {
      return new Date(date.year, date.month - 1, date.day);
    }
  }
}
