import { TransacaoTDColuna } from './transacao-td-coluna';
import { TransacaoTD } from './transacao-td';

import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransacaoTDColunaService {

  static readonly URL_API = environment.api + '/transacaotdcoluna';

  constructor(private httpClient: HttpClient) {
  }
  salvaEmLote(novasTransacaosTDColuna: TransacaoTDColuna[]): Observable<TransacaoTDColuna[]> {
    return this.httpClient.post<TransacaoTDColuna[]>(`${TransacaoTDColunaService.URL_API}/emlote`, novasTransacaosTDColuna);
  }

  apagarTDMsgTelaEmLote(transacaoTDColuna_id: number){
    return this.httpClient.delete<any>(`${TransacaoTDColunaService.URL_API}/emlote/${transacaoTDColuna_id}`);
  }

  listar(filtro: TransacaoTDColuna): Observable<TransacaoTDColuna[]> {
    return this.httpClient.get<TransacaoTDColuna[]>(`${TransacaoTDColunaService.URL_API}`, {params: filtro.toHttpParams()});
  }

  novo(novoTransacao: TransacaoTDColuna): Observable<TransacaoTDColuna> {
    return this.httpClient.post<TransacaoTDColuna>(`${TransacaoTDColunaService.URL_API}`, novoTransacao);
  }

  ver(transacaoTDColuna_id: number): Observable<TransacaoTDColuna> {
    return this.httpClient.get<TransacaoTDColuna>(`${TransacaoTDColunaService.URL_API}/${transacaoTDColuna_id}`);
  }

  editar(transacaoTDColunaModificado: TransacaoTDColuna): Observable<TransacaoTDColuna> {
    return this.httpClient.put<TransacaoTDColuna>(`${TransacaoTDColunaService.URL_API}`, transacaoTDColunaModificado);
  }

  apagar(transacaoTDColuna_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${TransacaoTDColunaService.URL_API}/${transacaoTDColuna_id}`);
  }


}
