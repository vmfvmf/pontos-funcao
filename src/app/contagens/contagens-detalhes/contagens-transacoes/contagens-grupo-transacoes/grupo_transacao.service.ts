
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrupoTransacao } from "./grupo-transacao";

@Injectable()
export class GrupoTransacaoService {

  static readonly URL_API = environment.api + '/grupoTransacao';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: GrupoTransacao): Observable<GrupoTransacao[]> {
    return this.httpClient.get<GrupoTransacao[]>(`${GrupoTransacaoService.URL_API}`, {params: filtro.toHttpParams()});
  }

  novo(novoGrupoTransacao: GrupoTransacao): Observable<GrupoTransacao> {
    return this.httpClient.post<GrupoTransacao>(`${GrupoTransacaoService.URL_API}`, novoGrupoTransacao);
  }

  ver(grupoTransacao_id: number): Observable<GrupoTransacao> {
    return this.httpClient.get<GrupoTransacao>(`${GrupoTransacaoService.URL_API}/${grupoTransacao_id}`);
  }

  editar(grupoTransacaoModificado: GrupoTransacao): Observable<GrupoTransacao> {
    return this.httpClient.put<GrupoTransacao>(`${GrupoTransacaoService.URL_API}`, grupoTransacaoModificado);
  }

  apagar(grupoTransacao_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${GrupoTransacaoService.URL_API}/${grupoTransacao_id}`);
  }

}
