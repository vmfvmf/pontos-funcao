import { Ded } from "../ded/ded";
import { Sistema } from "../sistema/sistema";
import { Sprint } from "../sprint/sprint";
import { ArquivoReferenciado } from "./cadastro/arquivo-referenciado/arquivo-referenciado";
import { GrupoTransacao } from "./cadastro/transacao/grupo/grupo-transacao";
import { Transacao } from "./cadastro/transacao/transacao";


export enum EscopoContagemEnum{
  SISTEMA = "SISTEMA",
  PROJETO = "PROJETO",
  SPRINT = "SPRINT"
}

export class IContagem {
  id?: number;
  ded?: Ded;
  sistema?: Sistema;
  sprint?: Sprint;
  dataContagem?: Date;
  contador?: String;
  escopo?: EscopoContagemEnum;
  totalPf?: number;
  transacaos?: Transacao[];
  arquivoReferenciado?: ArquivoReferenciado[];
  grupos?: GrupoTransacao[];
}

export class Contagem {
  id?: number;
  sistema?: Sistema;
  sprint?: Sprint;
  ded?: Ded;
  dataContagem?: Date;
  contador?: String;
  escopo?: EscopoContagemEnum;
  totalPf?: number;
  transacaos?: Transacao[];
  arquivoReferenciado?: ArquivoReferenciado[];
  grupos?: GrupoTransacao[];

  constructor(i: IContagem){
    this.id = i.id;
    this.sistema = i.sistema ? i.sistema : new Sistema({});
    this.sprint = i.sprint ? i.sprint : new Sprint({});
    this.ded = i.ded ? i.ded : new Ded({});
    this.transacaos = i.transacaos ? i.transacaos : [];
    this.arquivoReferenciado = i.arquivoReferenciado ? i.arquivoReferenciado : [];
    this.grupos = i.grupos ? i.grupos : [];
    this.escopo = i.escopo;
    this.totalPf = i.totalPf ? i.totalPf : 0;
    this.dataContagem = i.dataContagem;
    this.contador = i.contador;
  }

}
