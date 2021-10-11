
import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sistema } from "./sistema";
import { environment } from '../../environments/environment';

@Injectable()
export class SistemaService {

  static readonly URL_API = environment.api + '/sistemas';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro?: Sistema): Observable<Sistema[]> {
    return this.httpClient.get<Sistema[]>(`${SistemaService.URL_API}`, {params: Sistema.toHttpParams(filtro)});
  }

  novo(novoSistema: Sistema): Observable<Sistema> {
    return this.httpClient.post<Sistema>(`${SistemaService.URL_API}`, novoSistema);
  }

  ver(sitema_id: number): Observable<Sistema> {
    return this.httpClient.get<Sistema>(`${SistemaService.URL_API}/${sitema_id}`);
  }

  editar(sistemaModificado: Sistema): Observable<Sistema> {
    return this.httpClient.put<Sistema>(`${SistemaService.URL_API}`, sistemaModificado);
  }

  apagar(sistema_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${SistemaService.URL_API}/${sistema_id}`);
  }

}
