
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensagemTela } from "./mensagem-tela";

@Injectable()
export class MensagemTelaService {

  static readonly URL_API = environment.api + '/mensagemTelas';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: MensagemTela): Observable<MensagemTela[]> {
    return  this.httpClient.get<MensagemTela[]>(`${MensagemTelaService.URL_API}`);
  }

  novo(novoMensagemTela: MensagemTela): Observable<MensagemTela> {
    return this.httpClient.post<MensagemTela>(`${MensagemTelaService.URL_API}`, novoMensagemTela);
  }

  ver(mensagemTela_id: number): Observable<MensagemTela> {
    return this.httpClient.get<MensagemTela>(`${MensagemTelaService.URL_API}/${mensagemTela_id}`);
  }

  editar(mensagemTelaModificado: MensagemTela): Observable<MensagemTela> {
    return this.httpClient.put<MensagemTela>(`${MensagemTelaService.URL_API}`, mensagemTelaModificado);
  }

  apagar(mensagemTela_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${MensagemTelaService.URL_API}/${mensagemTela_id}`);
  }

}
