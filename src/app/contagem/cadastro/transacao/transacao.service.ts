import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Transacao } from "./transacao";


@Injectable()
export class TransacaoService {

  static readonly URL_API = environment.api + '/transacoes';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: Transacao): Observable<Transacao[]> {
    const params = {params: Transacao.toHttpParams(filtro)};
    return this.httpClient.get<Transacao[]>(`${TransacaoService.URL_API}/`, params);
  }

  salvar(novx: Transacao): Observable<Transacao> {
    return this.httpClient.post<Transacao>(`${TransacaoService.URL_API}`, novx);
  }

  ver(_id: number): Observable<Transacao> {
    return this.httpClient.get<Transacao>(`${TransacaoService.URL_API}/${_id}`);
  }

  apagar(_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${TransacaoService.URL_API}/${_id}`);
  }
}

