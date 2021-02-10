import { Paginacao } from '../shared/paginacao';
import { Ded, IDed } from './ded';
import { HttpParams } from '@angular/common/http';

export class FiltroDeds extends Ded {
    paginacao: Paginacao;

    constructor(iDed: IDed){
      super(iDed);
      this.paginacao = new Paginacao();
    }

    public aplicarFiltros(filtro: FiltroDeds): void {
      Object.assign(this, filtro);
    }

    public toHttpParams(): HttpParams {
        let httpParams = this.paginacao.toHttpParams();

        if (this.ded !== undefined) {
          httpParams = httpParams.set('nome', this.ded.toString());
        }

        if (this.descricao !== undefined) {
            httpParams = httpParams.set('ano', this.descricao);
        }
        return httpParams;
      }
}
