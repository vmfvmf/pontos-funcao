
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sistema } from "./sistema";

@Injectable()
export class SistemasService {

  static readonly URL_API = environment.api + '/sistemas';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Sistema): Observable<Sistema[]> {
    return this.httpClient.get<Sistema[]>(`${SistemasService.URL_API}`, {params: Sistema.toHttpParams(filtro)});
  }

  novo(novoSistema: Sistema): Observable<Sistema> {
    return this.httpClient.post<Sistema>(`${SistemasService.URL_API}`, novoSistema);
  }

  ver(sitema_id: number): Observable<Sistema> {
    return this.httpClient.get<Sistema>(`${SistemasService.URL_API}/${sitema_id}`);
  }

  editar(sistemaModificado: Sistema): Observable<Sistema> {
    return this.httpClient.put<Sistema>(`${SistemasService.URL_API}`, sistemaModificado);
  }

  apagar(sistema_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${SistemasService.URL_API}/${sistema_id}`);
  }

}
