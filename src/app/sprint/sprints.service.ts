
import { Sprint } from './sprint';
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SprintService {

  static readonly URL_API = environment.api + '/sprints';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro?: Sprint): Observable<Sprint[]> {
    return this.httpClient.get<Sprint[]>(`${SprintService.URL_API}`, {params: Sprint.toHttpParams(filtro || new Sprint())});
  }

  novo(novo: Sprint): Observable<Sprint> {
    return this.httpClient.post<Sprint>(`${SprintService.URL_API}`, novo);
  }

  ver(id: number): Observable<Sprint> {
    return this.httpClient.get<Sprint>(`${SprintService.URL_API}/${id}`);
  }

  editar(alterado: Sprint): Observable<Sprint> {
    return this.httpClient.put<Sprint>(`${SprintService.URL_API}`, alterado);
  }

  apagar(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${SprintService.URL_API}/${id}`);
  }

}
