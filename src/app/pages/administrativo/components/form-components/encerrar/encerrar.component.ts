import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encerramento',
  templateUrl: './encerrar.component.html',
  styleUrls: ['./encerrar.component.scss']
})
export class EncerramentoComponent implements OnInit, AfterViewInit {

  @Input()
  public contrato: FormGroup;

  @Input()
  public proposta: FormGroup;

  @Output()
  public showMotivo = new EventEmitter();

  @Output()
  public encerrarContrato = new EventEmitter();

  private modalInstance: NgbModalRef = null;
  public showCard: boolean;

  constructor(
    private modalService: NgbModal,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.showCard = false;
  }

  ngAfterViewInit(): void {
    this.clearMotivoControl();
  }

  collapseCard(): void {
    this.showCard === true ? this.showCard = false : this.showCard = true;
    this.collapseMotivo();
    this.clearMotivoControl();
  }

  collapseMotivo(): void {
    this.showMotivo.emit();
  }

  clearMotivoControl(): void {
    this.proposta.get('descricao').setValue('');
    this.contrato.get('dataEncerramento').setValue('');

    this.proposta.get('descricao').markAsUntouched();
    this.contrato.get('dataEncerramento').markAsUntouched();
  }

  openModal(content): void {
    this.modalInstance = this.modalService.open(content);
  }

  closeModal(): void {
    this.modalInstance.close();
  }

  inativarContrato(): void {
    this.encerrarContrato.emit();
    this.closeModal();
    this.navigateForGerenciar();
  }

  navigateForGerenciar(): void {
    this.route.navigate(['/pages/administrativo/gerenciar']);
  }

}
