import { ContagemEstado } from './contagem-estado.enum';
import { Projeto } from "../projeto/projeto";
import { Sistema } from "../sistema/sistema";
import { Sprint } from "../sprint/sprint";
import { ArquivoReferenciado } from "./cadastro/arquivo-referenciado/arquivo-referenciado";
import { Grupo } from "./cadastro/transacao/grupo/grupo";
import { Transacao } from "./cadastro/transacao/transacao";
import { ContagemEscopoEnum } from "./contagem-escopo.enum";


export class Contagem {
  id: number;
  sistema: Sistema;
  sprint: Sprint;
  projeto: Projeto;
  dataContagem: Date;
  contador: String;
  escopo: ContagemEscopoEnum;
  totalPontosFuncao: number;
  transacoes: Transacao[];
  estado: ContagemEstado;
  arquivosReferenciados: ArquivoReferenciado[];
  versao: number;

  constructor(id?: number){
    this.sistema = new Sistema();
    this.sprint = new Sprint();
    this.projeto = new Projeto();
    this.transacoes = [];
    this.arquivosReferenciados = [];
    this.dataContagem = new Date();
  }

  static GetContagemParent(contagem: Contagem) {
    const c = new Contagem(contagem.id);
    return c;
  }
}
