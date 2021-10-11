
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractContagemItem } from "./abstract-contagem-item";

@Injectable()
export class AbstractContagemItemService {

  static readonly URL_API = environment.api + '/itens';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: AbstractContagemItem): Observable<AbstractContagemItem[]> {
    const params = {params: AbstractContagemItem.toHttpParams(filtro)};
    return this.httpClient.get<AbstractContagemItem[]>(`${AbstractContagemItemService.URL_API}`, params);
  }

  salvar(novx: AbstractContagemItem): Observable<AbstractContagemItem> {
    return this.httpClient.post<AbstractContagemItem>(`${AbstractContagemItemService.URL_API}`, novx);
  }

  ver(_id: number): Observable<AbstractContagemItem> {
    return this.httpClient.get<AbstractContagemItem>(`${AbstractContagemItemService.URL_API}/${_id}`);
  }

  apagar(_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${AbstractContagemItemService.URL_API}/${_id}`);
  }

  apagarTds(itemId: number){
    return this.httpClient.delete<any>(`${AbstractContagemItemService.URL_API}/tds/${itemId}`);
  }

}

