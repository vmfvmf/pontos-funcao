// import { Sprint } from "../sprints/sprint";

import { Sistema } from "../sistema/sistema";

export interface IDed{
  id?: number;
  numero?: number;
  descricao?: string;
  sistema?: Sistema;
  // sprints?: Sprint[];
}

export class Ded {
  id?: number;
  numero?: number;
  descricao?: string;
  // sprints?: Sprint[];

  constructor(iDed: IDed){
    this.id = iDed.id;
    this.numero = iDed.numero;
    this.descricao = iDed.descricao;
  }
  static parse(objeto: Ded): Ded {
    const leilao = Object.assign(new Ded({}), objeto);

    // if (objeto && objeto.itens) {
    //     leilao.itens = objeto.itens.map(item => LeilaoItem.parse(item));
    // }

    return leilao;
}
}
