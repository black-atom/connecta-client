import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { ClienteService } from './../../../../../shared/services/cliente-service/cliente.service';


@Component({
  selector: 'app-dados-cliente-atendimento',
  templateUrl: './dados-cliente-atendimento.component.html',
  styleUrls: ['./dados-cliente-atendimento.component.scss']
})
export class DadosClienteAtendimentoComponent implements OnInit {

  @Input() formDadosPrincipaisAtendimento: FormGroup;

  constructor(private _clienteService: ClienteService) { }

  ngOnInit() {
  }

  buscarCliente(cnpjCpf) {
    this._clienteService.retornarTodos(cnpjCpf).subscribe((res) => {
       res.map(data => {
           this.formDadosPrincipaisAtendimento.get('cnpj_cpf').patchValue(data.cnpj_cpf);
         this.formDadosPrincipaisAtendimento.get('razao_social').patchValue(data.razao_social);
       })

    });
  }
}
