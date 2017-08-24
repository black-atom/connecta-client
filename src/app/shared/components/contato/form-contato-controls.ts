import { Validators } from '@angular/forms';

export let formContatoControls = {
    nome: ['', [Validators.required]],
    email: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    celular: [''],
    observacao: ['']
};
