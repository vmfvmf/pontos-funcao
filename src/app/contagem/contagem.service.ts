
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contagem } from "./contagem";

@Injectable()
export class ContagemService {

  static readonly URL_API = environment.api + '/contagens';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Contagem[]> {
    return this.httpClient.get<Contagem[]>(`${ContagemService.URL_API}`);
  }

  novo(novaContagem: Contagem): Observable<Contagem> {
    return this.httpClient.post<Contagem>(`${ContagemService.URL_API}`, novaContagem);
  }

  ver(contagem_id: number): Observable<Contagem> {
    return this.httpClient.get<Contagem>(`${ContagemService.URL_API}/${contagem_id}`);
  }

  editar(contagemModificado: Contagem): Observable<Contagem> {
    return this.httpClient.put<Contagem>(`${ContagemService.URL_API}`, contagemModificado);
  }

  apagar(contagem_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ContagemService.URL_API}/${contagem_id}`);
  }

}
