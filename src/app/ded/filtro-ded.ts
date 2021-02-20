import { Ded, IDed } from './ded';
import { HttpParams } from '@angular/common/http';

export class FiltroDeds extends Ded {

    constructor(iDed: IDed){
      super(iDed);
    }

    public aplicarFiltros(filtro: FiltroDeds): void {
      Object.assign(this, filtro);
    }

    public toHttpParams(): HttpParams {
        let httpParams = new HttpParams();

        if (this.numero !== undefined) {
          httpParams = httpParams.set('nome', this.numero.toString());
        }

        if (this.descricao !== undefined) {
            httpParams = httpParams.set('ano', this.descricao);
        }
        return httpParams;
      }
}
