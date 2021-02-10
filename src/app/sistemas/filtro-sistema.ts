import { Paginacao } from '../shared/paginacao';
import { HttpParams } from '@angular/common/http';
import { Sistema, ISistema } from './sistema';

export class FiltroSistema extends Sistema {
    paginacao: Paginacao;

    constructor(iSistema: ISistema){
      super(iSistema)
      this.paginacao = new Paginacao();
    }

    public aplicarFiltros(filtro: FiltroSistema): void {
      Object.assign(this, filtro);
    }

    public toHttpParams(): HttpParams {
        let httpParams = this.paginacao.toHttpParams();

        if (this.nome !== undefined) {
          httpParams = httpParams.set('nome', this.nome);
        }
        return httpParams;
      }
}
