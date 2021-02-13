
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuncaoDados } from "./funcao-dados";

@Injectable()
export class FuncaoDadosService {

  static readonly URL_API = environment.api + '/funcaoDados';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: FuncaoDados): Observable<FuncaoDados[]> {
    return this.httpClient.get<FuncaoDados[]>(`${FuncaoDadosService.URL_API}`, {params: filtro.toHttpParams()});
  }

  novo(novoArquivoLogico: FuncaoDados): Observable<FuncaoDados> {
    return this.httpClient.post<FuncaoDados>(`${FuncaoDadosService.URL_API}`, novoArquivoLogico);
  }

  ver(arquivoLogico_id: number): Observable<FuncaoDados> {
    return this.httpClient.get<FuncaoDados>(`${FuncaoDadosService.URL_API}/${arquivoLogico_id}`);
  }

  editar(arquivoLogicoModificado: FuncaoDados): Observable<FuncaoDados> {
    return this.httpClient.put<FuncaoDados>(`${FuncaoDadosService.URL_API}`, arquivoLogicoModificado);
  }

  apagar(arquivoLogico_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${FuncaoDadosService.URL_API}/${arquivoLogico_id}`);
  }

}
