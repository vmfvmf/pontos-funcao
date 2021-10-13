
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from "./grupo";

@Injectable()
export class GrupoService {

  static readonly URL_API = environment.api + '/grupos';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Grupo): Observable<Grupo[]> {
    return this.httpClient.get<Grupo[]>(`${GrupoService.URL_API}`, {params: Grupo.toHttpParams(filtro)});
  }

  novo(novoGrupoTransacao: Grupo): Observable<Grupo> {
    return this.httpClient.post<Grupo>(`${GrupoService.URL_API}`, novoGrupoTransacao);
  }

  ver(grupoTransacao_id: number): Observable<Grupo> {
    return this.httpClient.get<Grupo>(`${GrupoService.URL_API}/${grupoTransacao_id}`);
  }

  editar(grupoTransacaoModificado: Grupo): Observable<Grupo> {
    return this.httpClient.put<Grupo>(`${GrupoService.URL_API}`, grupoTransacaoModificado);
  }

  apagar(grupoTransacao_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${GrupoService.URL_API}/${grupoTransacao_id}`);
  }

}
