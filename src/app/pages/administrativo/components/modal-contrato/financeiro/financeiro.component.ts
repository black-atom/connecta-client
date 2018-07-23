import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  @Input()
  public contratoSelecionadoFinanceiro;

  public financeiroForm: FormGroup;

  public status: String[] = [
    'Pago',
    'Aberto',
    'Pendente',
    'Cancelado',
    'Aguardando'
  ];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initFinanceiroForm();
  }

  initFinanceiroForm() {
    this.financeiroForm = this.fb.group({
      financeiro: this.fb.array([])
    });
  }

  dividaForm() {
    return this.fb.group({
      descricao: ['', Validators.required],
      status: ['', Validators.required],
      mesVirgente: ['', Validators.required],
      valor: ['', Validators.minLength(1)]
    });
  }

  get financeiro(): FormArray {
    return this.financeiroForm.get('financeiro') as FormArray;
  }

  addDivida(): void {
    const financeiro = this.financeiro as FormArray;
    financeiro.push(this.dividaForm());
  }

  removeDivida(index: number): void {
    const financeiro = this.financeiro as FormArray;
    financeiro.removeAt(index);
  }

}
