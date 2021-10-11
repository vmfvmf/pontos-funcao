import { Ded } from "../ded/ded";
import { Sistema } from "../sistema/sistema";
import { Sprint } from "../sprint/sprint";
import { ArquivoReferenciado } from "./cadastro/arquivo-referenciado/arquivo-referenciado";
import { Grupo } from "./cadastro/transacao/grupo/grupo";
import { Transacao } from "./cadastro/transacao/transacao";
import { ContagemEscopoEnum } from "./contagem-escopo.enum";


export class Contagem {
  id?: number;
  sistema?: Sistema;
  sprint?: Sprint;
  ded?: Ded;
  dataContagem?: Date;
  contador?: String;
  escopo?: ContagemEscopoEnum;
  totalPf?: number;
  transacaos?: Transacao[];
  arquivoReferenciado?: ArquivoReferenciado[];
  grupos?: Grupo[];

  constructor(){
    this.sistema = new Sistema({});
    this.sprint = new Sprint({});
    this.ded = new Ded({});
    this.transacaos = [];
    this.arquivoReferenciado = [];
    this.grupos = [];
    this.totalPf =  0;
    this.dataContagem = new Date();
  }

}
