import { Validators } from '@angular/forms';

export let formContatoControls = {
    nome: [''],
    email: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    observacao: ['']
};
