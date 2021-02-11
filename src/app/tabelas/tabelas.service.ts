
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tabela } from "./tabela";

@Injectable()
export class TabelasService {

  static readonly URL_API = environment.api + '/tabelas';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Tabela): Observable<Tabela[]> {
    return this.httpClient.get<Tabela[]>(`${TabelasService.URL_API}`, {params: Tabela.toHttpParams(filtro)});
  }

  novo(novoTabela: Tabela): Observable<Tabela> {
    return this.httpClient.post<Tabela>(`${TabelasService.URL_API}`, novoTabela);
  }

  ver(sitema_id: number): Observable<Tabela> {
    return this.httpClient.get<Tabela>(`${TabelasService.URL_API}/${sitema_id}`);
  }

  editar(tabelaModificado: Tabela): Observable<Tabela> {
    return this.httpClient.put<Tabela>(`${TabelasService.URL_API}`, tabelaModificado);
  }

  apagar(tabela_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${TabelasService.URL_API}/${tabela_id}`);
  }

}
