import { FiltroSprint } from './filtro-sprint';
import { ISprint, Sprint } from './sprint';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SprintsService {

  static readonly URL_API = environment.api + '/sprints';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Sprint): Observable<Sprint[]> {
    return this.httpClient.get<Sprint[]>(`${SprintsService.URL_API}`, {params: Sprint.toHttpParams(filtro)});
  }

  novo(novoSprint: Sprint): Observable<Sprint> {
    return this.httpClient.post<Sprint>(`${SprintsService.URL_API}`, novoSprint);
  }

  ver(sprint_id: number): Observable<Sprint> {
    return this.httpClient.get<Sprint>(`${SprintsService.URL_API}/${sprint_id}`);
  }

  editar(dedModificado: Sprint): Observable<Sprint> {
    return this.httpClient.put<Sprint>(`${SprintsService.URL_API}`, dedModificado);
  }

  apagar(sprint_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${SprintsService.URL_API}/${sprint_id}`);
  }

}
