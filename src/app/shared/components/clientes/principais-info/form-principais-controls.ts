import { Validators } from '@angular/forms';

export let formPrincipaisControls = {
    cnpj_cpf: ['', [Validators.required]],
    nome_razao_social: ['', [Validators.required]],
    inscricao_estadual: ['', [Validators.required]],
    nome_fantasia: ['', [Validators.required]]
};
