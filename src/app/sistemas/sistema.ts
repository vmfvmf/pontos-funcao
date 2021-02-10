
export interface ISistema{
  id?: number;
  nome?: string;
  versao?: string;
}

export class Sistema implements ISistema{
  id?: number;
  nome?: string;
  versao?: string;

  constructor(iSistema: ISistema){
    this.id = iSistema.id;
    this.nome = iSistema.nome;
    this.versao = iSistema.versao;
  }

}
