import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fotos-atendimento',
  templateUrl: './fotos-atendimento.component.html',
  styleUrls: ['./fotos-atendimento.component.scss']
})
export class FotosAtendimentoComponent implements OnInit {

  @Input()
  fotosAtendimento;

  constructor() { }

  ngOnInit() {
  }

}
