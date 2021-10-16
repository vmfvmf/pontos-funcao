import { ContagemEstado } from './contagem-estado.enum';
import { Projeto } from "../projeto/projeto";
import { Sistema } from "../sistema/sistema";
import { Sprint } from "../sprint/sprint";
import { ArquivoReferenciado } from "./cadastro/arquivo-referenciado/arquivo-referenciado";
import { Grupo } from "./cadastro/transacao/grupo/grupo";
import { Transacao } from "./cadastro/transacao/transacao";
import { ContagemEscopoEnum } from "./contagem-escopo.enum";
import { HttpParams } from '@angular/common/http';


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
  ultimaVersao: boolean;
  criado: Date;
  modificado: Date;

  compararVersao: boolean;
  alteradoContador: string;
	alteradoDataContagem: Date;;
	alteradoTotalPontosFuncao: number;;

  constructor(id?: number){
    this.id = id;
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

  public static toHttpParams(contagem: Contagem): HttpParams {
    let httpParams = new HttpParams();

    if (contagem.sistema) {
      httpParams = httpParams.append('sistema.id', contagem.sistema.id.toString());
    }

    if (contagem.sprint) {
      httpParams = httpParams.append('sprint.id', contagem.sprint.id.toString());
    }

    if (contagem.projeto) {
      httpParams = httpParams.append('projeto.id', contagem.projeto.id.toString());
    }

    if (contagem.versao) {
      httpParams = httpParams.append('versao', contagem.versao.toString());
    }
    return httpParams;
  }
}
