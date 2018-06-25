import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routing } from './administrativo.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { ModuloCompartilhado } from 'app/shared/shared.module';

import { AdministrativoComponent } from './administrativo.component';
import { NovoContratoComponent } from './components/novo-contrato/novo-contrato.component';
import { GerenciarContratoComponent } from './components/gerenciar-contrato/gerenciar-contrato.component';
import { ModalContratoComponent } from './components/modal-contrato/modal-contrato.component';
import { DadosClienteComponent } from './components/modal-contrato/dados-cliente/dados-cliente.component';
import { EquipamentosComponent } from './components/modal-contrato/equipamentos/equipamentos.component';
import { FinanceiroComponent } from './components/modal-contrato/financeiro/financeiro.component';
import { FormCanDeactivateGuard } from '../../shared/guards/form-deactivate.guard';
import { EditarContratoComponent } from './components/editar-contrato/editar-contrato.component';
import { DadosPrincipaisClienteComponent } from './components/form-components/dados-principais/dados-principais.component';
import { ContatoClienteComponent } from './components/form-components/contato/contato.component';
import { EnderecoClienteComponent } from './components/form-components/endereco/endereco.component';
import { DetalhesContratoComponent } from './components/form-components/detalhes/detalhes.component';
import { EquipamentoFormComponent } from './components/form-components/equipamentos-form/equipamento-form.component';
import { RelacaoEquipamentosComponent } from './components/form-components/relacao-equipamentos/relacao-equipamentos.component';
import { HistoricoComponent } from './components/modal-contrato/historico/historico.component';
import { MotivoComponent } from './components/form-components/motivo/motivo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    ModuloCompartilhado,
    routing
  ],
  providers: [
    FormCanDeactivateGuard
  ],
  declarations: [
    AdministrativoComponent,
    NovoContratoComponent,
    DadosPrincipaisClienteComponent,
    GerenciarContratoComponent,
    ContatoClienteComponent,
    EnderecoClienteComponent,
    DetalhesContratoComponent,
    EquipamentoFormComponent,
    RelacaoEquipamentosComponent,
    ModalContratoComponent,
    DadosClienteComponent,
    EquipamentosComponent,
    FinanceiroComponent,
    HistoricoComponent,
    MotivoComponent,
    EditarContratoComponent
  ],
  entryComponents: [
    ModalContratoComponent,
    DadosClienteComponent,
    EquipamentosComponent,
    FinanceiroComponent
  ]
})
export class AdministrativoModule { }
