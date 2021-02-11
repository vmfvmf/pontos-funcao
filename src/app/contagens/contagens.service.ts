
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contagem } from "./contagem";
import { Sistema } from "../sistemas/sistema";

@Injectable()
export class ContagensService {

  static readonly URL_API = environment.api + '/contagens';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Contagem): Observable<Contagem[]> {
    return this.httpClient.get<Contagem[]>(`${ContagensService.URL_API}`, {params: Contagem.toHttpParams(filtro)});
  }

  novo(novaContagem: Contagem): Observable<Contagem> {
    return this.httpClient.post<Contagem>(`${ContagensService.URL_API}`, novaContagem);
  }

  ver(contagem_id: number): Observable<Contagem> {
    return this.httpClient.get<Contagem>(`${ContagensService.URL_API}/${contagem_id}`);
  }

  verSistema(contagem_id: number): Observable<Sistema> {
    return this.httpClient.get<Sistema>(`${environment.api}contagem/sistema/${contagem_id}`);
  }

  editar(contagemModificado: Contagem): Observable<Contagem> {
    return this.httpClient.put<Contagem>(`${ContagensService.URL_API}`, contagemModificado);
  }

  apagar(contagem_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ContagensService.URL_API}/${contagem_id}`);
  }

}
