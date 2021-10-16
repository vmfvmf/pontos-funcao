import { Sistema } from './../sistema/sistema';
import { ContagemEscopoEnum } from './contagem-escopo.enum';

import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contagem } from "./contagem";

@Injectable()
export class ContagemService {
  static readonly URL_API = environment.api + '/contagens';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Contagem[]> {
    return this.httpClient.get<Contagem[]>(`${ContagemService.URL_API}`);
  }

  listarVersoes(contagem: Contagem): Observable<Contagem[]> {
    const filtro = new Contagem();
    filtro.projeto = contagem.projeto;
    filtro.sprint = contagem.sprint;
    filtro.sistema = contagem.sistema;
    filtro.versao = contagem.versao;
    return this.httpClient.get<Contagem[]>(`${ContagemService.URL_API}/${contagem.id}/versoes`, {params: Contagem.toHttpParams(filtro)});
  }

  salvar(novaContagem: Contagem): Observable<Contagem> {
    if(novaContagem.escopo == ContagemEscopoEnum.SISTEMA){
      delete novaContagem.projeto;
      delete novaContagem.sprint;
    }else if(novaContagem.escopo == ContagemEscopoEnum.PROJETO) {
      delete novaContagem.sprint;
    } else {
      delete novaContagem.projeto;
    }
    return this.httpClient.post<Contagem>(`${ContagemService.URL_API}`, novaContagem);
  }

  versionar(contagemId: number) : Observable<Contagem> {
    return this.httpClient.get<Contagem>(`${ContagemService.URL_API}/${contagemId}/versionar`);
  }

  compararVersao(idVersaoAtual: number, idVersaoAnterior: number) {
    return this.httpClient.get<Contagem>(`${ContagemService.URL_API}/${idVersaoAtual}/comparar-versao-anterior/${idVersaoAnterior}`);
  }

  criarEsboco(contagemId: number) : Observable<Contagem> {
    return this.httpClient.get<Contagem>(`${ContagemService.URL_API}/${contagemId}/criar_novo_esboco_incremento_versao`);
  }

  ver(contagem_id: number): Observable<Contagem> {
    return this.httpClient.get<Contagem>(`${ContagemService.URL_API}/${contagem_id}`);
  }

  apagar(contagem_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ContagemService.URL_API}/${contagem_id}`);
  }

}

