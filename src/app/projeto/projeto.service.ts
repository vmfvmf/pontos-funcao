import { Projeto } from './projeto';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjetoService {

  static readonly URL_API = environment.api + '/projetos';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Projeto[]> {
    return this.httpClient.get<Projeto[]>(`${ProjetoService.URL_API}`);
  }

  novo(novo: Projeto): Observable<Projeto> {
    return this.httpClient.post<Projeto>(`${ProjetoService.URL_API}`, novo);
  }

  ver(id: number): Observable<Projeto> {
    return this.httpClient.get<Projeto>(`${ProjetoService.URL_API}/${id}`);
  }

  editar(alterado: Projeto): Observable<Projeto> {
    return this.httpClient.put<Projeto>(`${ProjetoService.URL_API}`, alterado);
  }

  apagar(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ProjetoService.URL_API}/${id}`);
  }

}
