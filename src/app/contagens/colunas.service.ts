
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coluna } from "./tabela";

@Injectable()
export class ColunasService {

  static readonly URL_API = environment.api + '/colunas';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Coluna): Observable<Coluna[]> {
    return this.httpClient.get<Coluna[]>(`${ColunasService.URL_API}`, {params: Coluna.toHttpParams(filtro)});
  }

  novo(novoColuna: Coluna): Observable<Coluna> {
    return this.httpClient.post<Coluna>(`${ColunasService.URL_API}`, novoColuna);
  }

  salvaEmLote(novasColunas: Coluna[]): Observable<Coluna[]> {
    return this.httpClient.post<Coluna[]>(`${ColunasService.URL_API}/emlote`, novasColunas);
  }

  ver(coluna_id: number): Observable<Coluna> {
    return this.httpClient.get<Coluna>(`${ColunasService.URL_API}/${coluna_id}`);
  }

  editar(colunaModificado: Coluna): Observable<Coluna> {
    return this.httpClient.put<Coluna>(`${ColunasService.URL_API}`, colunaModificado);
  }

  apagar(coluna_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ColunasService.URL_API}/${coluna_id}`);
  }

}
