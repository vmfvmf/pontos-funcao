
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coluna } from "./tabela";

@Injectable()
export class ColunaService {

  static readonly URL_API = environment.api + '/colunas';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Coluna): Observable<Coluna[]> {
    return this.httpClient.get<Coluna[]>(`${ColunaService.URL_API}`, {params: Coluna.toHttpParams(filtro)});
  }

  novo(novoColuna: Coluna): Observable<Coluna> {
    return this.httpClient.post<Coluna>(`${ColunaService.URL_API}`, novoColuna);
  }

  salvaEmLote(novasColunas: Coluna[]): Observable<Coluna[]> {
    return this.httpClient.post<Coluna[]>(`${ColunaService.URL_API}/emlote`, novasColunas);
  }

  ver(coluna_id: number): Observable<Coluna> {
    return this.httpClient.get<Coluna>(`${ColunaService.URL_API}/${coluna_id}`);
  }

  editar(colunaModificado: Coluna): Observable<Coluna> {
    return this.httpClient.put<Coluna>(`${ColunaService.URL_API}`, colunaModificado);
  }

  apagar(coluna_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ColunaService.URL_API}/${coluna_id}`);
  }

}
