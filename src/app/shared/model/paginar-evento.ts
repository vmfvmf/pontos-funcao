import { HttpParams } from '@angular/common/http';

export class PaginarEvento {
  pagina: number;
  tamanhoPagina: number;
  ordenar: string;
  ascendente: boolean;

  constructor( pagina: number = 1, tamanhoPagina: number = 10, ordenar?: string, ascendente: boolean = true) {
    this.pagina = pagina;
    this.tamanhoPagina = tamanhoPagina;
    this.ordenar = ordenar;
    this.ascendente = ascendente;
  }

  copyData( { pagina = 1, tamanhoPagina = 10, ordenar = '', ascendente = true}: Partial<PaginarEvento> = {}): void {
    this.pagina = pagina;
    this.tamanhoPagina = tamanhoPagina;
    this.ordenar = ordenar;
    this.ascendente = ascendente;
  }

  /**
   * Define os parâmetros para a requisição HTTP paginada.
   * Os nomes dos query params estão definidos na classe br.jus.csjt.pje.core.api.BaseApi no backend
   * @param {HttpParams} httpParams Objeto onde serão definidos os parâmetros HTTP
   * @returns {HttpParams} Um novo objeto HttpParams com os parâmetros definidos
   */
  definirParametrosHttp(httpParams: HttpParams = new HttpParams()): HttpParams {
    httpParams = httpParams
      .set('pagina', this.pagina.toString())
      .set('tamanhoPagina', this.tamanhoPagina.toString());
    if (this.ordenar) {
      httpParams = httpParams
        .set('ordenacaoColuna', this.ordenar)
        .set('ordenacaoAscendente', String(this.ascendente));
    }
    return httpParams;
  }
}
