
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArquivoReferenciado } from "./arquivo-referenciado";

@Injectable()
export class ArquivoReferenciadoService {

  static readonly URL_API = environment.api + '/arquivoReferenciado';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: ArquivoReferenciado): Observable<ArquivoReferenciado[]> {
    return this.httpClient.get<ArquivoReferenciado[]>(`${ArquivoReferenciadoService.URL_API}`, {params: filtro.toHttpParams()});
  }

  novo(novoArquivoLogico: ArquivoReferenciado): Observable<ArquivoReferenciado> {
    return this.httpClient.post<ArquivoReferenciado>(`${ArquivoReferenciadoService.URL_API}`, novoArquivoLogico);
  }

  ver(arquivoLogico_id: number): Observable<ArquivoReferenciado> {
    return this.httpClient.get<ArquivoReferenciado>(`${ArquivoReferenciadoService.URL_API}/${arquivoLogico_id}`);
  }

  editar(arquivoLogicoModificado: ArquivoReferenciado): Observable<ArquivoReferenciado> {
    return this.httpClient.put<ArquivoReferenciado>(`${ArquivoReferenciadoService.URL_API}`, arquivoLogicoModificado);
  }

  apagar(arquivoLogico_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ArquivoReferenciadoService.URL_API}/${arquivoLogico_id}`);
  }

}
