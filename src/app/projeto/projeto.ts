export class Projeto {
  id: number;
  identificador: string;
  descricao: string;

  constructor(){
  }

  static parse(objeto: Projeto): Projeto {
    const projeto = Object.assign(new Projeto(), objeto);

    // if (objeto && objeto.itens) {
    //     leilao.itens = objeto.itens.map(item => LeilaoItem.parse(item));
    // }

    return projeto;
}
}
