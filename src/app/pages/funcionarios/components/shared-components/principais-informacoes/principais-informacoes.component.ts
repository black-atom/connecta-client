import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-principais-informacoes',
  templateUrl: './principais-informacoes.component.html',
  styleUrls: ['./principais-informacoes.component.scss']
})
export class PrincipaisInformacoesComponent implements OnInit {

  @Input()
  dadosPrincipaisFuncionario: FormGroup;

  private mascaraCpf = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  private mascaraRg = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/];
  private mascaraDataNasc = [/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/];


  constructor() { }

  ngOnInit() {
  }

}
