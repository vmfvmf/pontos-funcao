import { Ded } from './ded';
import { Observable, of } from "rxjs";
import { FiltroDeds } from "./filtro-ded";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class DedService {

  static readonly URL_API = environment.api + '/deds';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Ded[]> {
    return this.httpClient.get<Ded[]>(`${DedService.URL_API}`);
  }

  novo(novoDed: Ded): Observable<Ded> {
    return this.httpClient.post<Ded>(`${DedService.URL_API}`, novoDed);
  }

  ver(ded_id: number): Observable<Ded> {
    return this.httpClient.get<Ded>(`${DedService.URL_API}/${ded_id}`);
  }

  editar(dedModificado: Ded): Observable<Ded> {
    return this.httpClient.put<Ded>(`${DedService.URL_API}`, dedModificado);
  }

  apagar(ded_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${DedService.URL_API}/${ded_id}`);
  }

}
