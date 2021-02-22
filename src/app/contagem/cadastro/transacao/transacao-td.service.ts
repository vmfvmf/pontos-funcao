import { TransacaoTD } from './transacao-td';

import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransacaoTDService {

  static readonly URL_API = environment.api + '/transacaotd';

  constructor(private httpClient: HttpClient) {
  }
  listar(filtro: TransacaoTD): Observable<TransacaoTD[]> {
    return this.httpClient.get<TransacaoTD[]>(`${TransacaoTDService.URL_API}`, {params: TransacaoTD.toHttpParams(filtro)});
  }

  save(_new: TransacaoTD): Observable<TransacaoTD> {
    return this.httpClient.post<TransacaoTD>(`${TransacaoTDService.URL_API}`, _new);
  }

  ver(_id: number): Observable<TransacaoTD> {
    return this.httpClient.get<TransacaoTD>(`${TransacaoTDService.URL_API}/${_id}`);
  }

  apagar(_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${TransacaoTDService.URL_API}/${_id}`);
  }


}
