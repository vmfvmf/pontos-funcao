import { ISprint } from './sprint';
import { Paginacao } from '../shared/paginacao';


export class FiltroSprint {
    paginacao: Paginacao;
    sprint: ISprint;

    constructor(sprint: ISprint){
      this.sprint = sprint;
      this.paginacao = new Paginacao();
    }

    public aplicarFiltros(filtro: FiltroSprint): void {
      Object.assign(this, filtro);
    }
}
