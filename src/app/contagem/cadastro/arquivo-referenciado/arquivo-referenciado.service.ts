import { ArquivoReferenciado } from './arquivo-referenciado';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";


@Injectable()
export class ArquivoReferenciadoService {

  static readonly URL_API = environment.api + '/arquivos_referenciados';

  constructor(private httpClient: HttpClient) {
  }

  listar(filtro: ArquivoReferenciado): Observable<ArquivoReferenciado[]> {
    const params = {params: ArquivoReferenciado.toHttpParams(filtro)};
    return this.httpClient.get<ArquivoReferenciado[]>(`${ArquivoReferenciadoService.URL_API}/`, params);
  }

  salvar(novx: ArquivoReferenciado): Observable<ArquivoReferenciado> {
    return this.httpClient.post<ArquivoReferenciado>(`${ArquivoReferenciadoService.URL_API}`, novx);
  }

  ver(_id: number): Observable<ArquivoReferenciado> {
    return this.httpClient.get<ArquivoReferenciado>(`${ArquivoReferenciadoService.URL_API}/${_id}`);
  }

  apagar(_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ArquivoReferenciadoService.URL_API}/${_id}`);
  }
}

