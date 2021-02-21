
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITabela, Tabela } from "./tabela";

@Injectable()
export class TabelaService {

  static readonly URL_API = environment.api + '/tabelas';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: ITabela): Observable<Tabela[]> {
    return this.httpClient.get<Tabela[]>(`${TabelaService.URL_API}`, {params: Tabela.toHttpParams(filtro)});
  }

  save(novaTabela: Tabela): Observable<Tabela> {
    return this.httpClient.post<Tabela>(`${TabelaService.URL_API}`, novaTabela);
  }

  batchSave(novasTabelas: Tabela[]): Observable<Tabela[]> {
    return this.httpClient.post<Tabela[]>(`${TabelaService.URL_API}/emlote`, novasTabelas);
  }

  ver(sitema_id: number): Observable<Tabela> {
    return this.httpClient.get<Tabela>(`${TabelaService.URL_API}/${sitema_id}`);
  }

  apagar(tabela_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${TabelaService.URL_API}/${tabela_id}`);
  }

}
