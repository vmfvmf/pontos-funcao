import { Ded } from './ded';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ConsultaPaginada } from "../shared/consulta-paginada";
import { FiltroDeds } from "./filtro-ded";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class DedsService {

  static readonly URL_API = environment.api + '/deds';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: FiltroDeds): Observable<Ded[]> {
    return this.httpClient.get<Ded[]>(`${DedsService.URL_API}`);
  }

  novo(novoDed: Ded): Observable<Ded> {
    return this.httpClient.post<Ded>(`${DedsService.URL_API}`, novoDed);
  }

  ver(ded_id: number): Observable<Ded> {
    return this.httpClient.get<Ded>(`${DedsService.URL_API}/${ded_id}`);
  }

  editar(dedModificado: Ded): Observable<Ded> {
    return this.httpClient.put<Ded>(`${DedsService.URL_API}`, dedModificado);
  }

  apagar(ded_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${DedsService.URL_API}/${ded_id}`);
  }

}
