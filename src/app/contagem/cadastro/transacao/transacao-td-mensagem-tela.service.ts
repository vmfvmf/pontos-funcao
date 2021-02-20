import { TransacaoTD } from './transacao-td';

import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransacaoTDMensagemTelaService {

  static readonly URL_API = environment.api + '/transacaomsgtelatd';

  constructor(private httpClient: HttpClient) {
  }
  salvaMsgTelaEmLote(novasTransacaos: TransacaoTD[]): Observable<TransacaoTD[]> {
    return this.httpClient.post<TransacaoTD[]>(`${TransacaoTDMensagemTelaService.URL_API}/emlote`, novasTransacaos);
  }

  apagarTDMsgTelaEmLote(transacao_id: number){
    return this.httpClient.delete<any>(`${TransacaoTDMensagemTelaService.URL_API}/emlote/${transacao_id}`);
  }


}
