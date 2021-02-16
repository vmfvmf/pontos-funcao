
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transacao } from "./transacao";
import { MensagemTela } from "./contagens-mensagens-telas/mensagem-tela";

@Injectable()
export class TransacaoService {

  static readonly URL_API = environment.api + '/transacaos';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Transacao): Observable<Transacao[]> {
    return this.httpClient.get<Transacao[]>(`${TransacaoService.URL_API}`, {params: filtro.toHttpParams()});
  }

  novo(novoTransacao: Transacao): Observable<Transacao> {
    return this.httpClient.post<Transacao>(`${TransacaoService.URL_API}`, novoTransacao);
  }

  salvaEmLote(novasTransacaos: Transacao[]): Observable<Transacao[]> {
    return this.httpClient.post<Transacao[]>(`${TransacaoService.URL_API}/emlote`, novasTransacaos);
  }

  ver(transacao_id: number): Observable<Transacao> {
    return this.httpClient.get<Transacao>(`${TransacaoService.URL_API}/${transacao_id}`);
  }

  editar(transacaoModificado: Transacao): Observable<Transacao> {
    return this.httpClient.put<Transacao>(`${TransacaoService.URL_API}`, transacaoModificado);
  }

  apagar(transacao_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${TransacaoService.URL_API}/${transacao_id}`);
  }
}
