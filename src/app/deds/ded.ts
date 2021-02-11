import { Sprint } from "../sprints/sprint";

export interface IDed{
  id?: number;
  numero?: number;
  descricao?: string;
  sprints?: Sprint[];
}

export class Ded implements IDed{
  id?: number;
  numero?: number;
  descricao?: string;
  sprints?: Sprint[];

  constructor(iDed: IDed){
    this.id = iDed.id;
    this.numero = iDed.numero;
    this.descricao = iDed.descricao;
    this.sprints = iDed.sprints;
  }
  static parse(objeto: Ded): Ded {
    const leilao = Object.assign(new Ded({}), objeto);

    // if (objeto && objeto.itens) {
    //     leilao.itens = objeto.itens.map(item => LeilaoItem.parse(item));
    // }

    return leilao;
}
}
