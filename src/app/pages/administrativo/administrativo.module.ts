import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routing } from './administrativo.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { ModuloCompartilhado } from '../../shared/shared.module';

import { AdministrativoComponent } from './administrativo.component';
import { NovoContratoComponent } from './components';
import { ContatoClienteComponent } from './components/novo-contrato/form-components/contato/contato.component';
import { EnderecoClienteComponent } from './components/novo-contrato/form-components/endereco/endereco.component';
import { DetalhesContratoComponent } from './components/novo-contrato/form-components/detalhes/detalhes.component';
import { EquipamentosContratoComponent } from './components/novo-contrato/form-components/equipamentos/equipamentos.component';
import { DadosPrincipaisClienteComponent } from './components/novo-contrato/form-components/dados-principais/dados-principais.component';
import { EquipamentoFormComponent } from './components/novo-contrato/form-components/equipamentos/equipamentos-form/equipamento-form.component';
import {
  RelacaoEquipamentosComponent
} from './components/novo-contrato/form-components/equipamentos/relacao-equipamentos/relacao-equipamentos.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    ModuloCompartilhado,
    routing
  ],
  declarations: [
    AdministrativoComponent,
    NovoContratoComponent,
    DadosPrincipaisClienteComponent,
    ContatoClienteComponent,
    EnderecoClienteComponent,
    DetalhesContratoComponent,
    EquipamentosContratoComponent,
    EquipamentoFormComponent,
    RelacaoEquipamentosComponent
  ]
})
export class AdministrativoModule { }
