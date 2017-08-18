import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class ManipuladorErro {
   static lidaComErro(erro: Response | any) {
        
        let mensagemErro: string;

        if (erro instanceof Response) {
            mensagemErro = `Ocorreu o erro ${erro.status}`;
        } else {
            mensagemErro = erro.toString();
        }

        console.log(mensagemErro);
        return Observable.throw(mensagemErro);
    }
}

