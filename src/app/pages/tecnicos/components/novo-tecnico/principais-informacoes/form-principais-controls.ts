import { Validators } from '@angular/forms';

// tslint:disable-next-line:max-line-length
const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export let formPrincipaisControls = {
    nome: ['', [Validators.required]],
    rg: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    data_nasc: ['', [Validators.required]],
    email: ['', [Validators.pattern(this.emailPattern)]],
    telefone: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    observacao: [''],

};
