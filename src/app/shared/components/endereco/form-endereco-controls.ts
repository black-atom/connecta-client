import { Validators } from '@angular/forms';

export let formEnderecoControls = {
    cep: ['', [Validators.required]],
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    complemento: [''],
    ponto_referencia: [''],
    uf: ['', [Validators.required]]
};
