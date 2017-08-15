import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { AddressInfo } from './../../../../../models/addressInfo';
import { CepService } from './../../../../../shared/services/cep-service/cep.service';

@Component({
  selector: 'app-endereco-cliente-atendimento',
  templateUrl: './endereco-cliente-atendimento.component.html',
  styleUrls: ['./endereco-cliente-atendimento.component.scss']
})
export class EnderecoClienteAtendimentoComponent implements OnInit {

@Input() formEnderecoAtendimento: FormGroup;

   constructor(private _cepService: CepService) {}

   ngOnInit() {
   }

   buscaPorCep(cep: string) {
     this._cepService.obterInfoEndereco(cep).subscribe((data: AddressInfo) => {
         this.formEnderecoAtendimento.get('cidade').patchValue(data.localidade);
         this.formEnderecoAtendimento.get('complemento').patchValue(data.complemento);
         this.formEnderecoAtendimento.get('estado').patchValue(data.uf);
         this.formEnderecoAtendimento.get('rua').patchValue(data.logradouro);
         this.formEnderecoAtendimento.get('bairro').patchValue(data.bairro);
     });


   }

}
