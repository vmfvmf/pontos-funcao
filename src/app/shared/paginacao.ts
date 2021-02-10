import { HttpParams } from '@angular/common/http';
import { PaginarEvento } from './paginar-evento';

export class Paginacao {
    pagina: number;
    tamanhoPagina: number;
    ordenar?: string;
    ascendente?: boolean;

    aplicarPaginarEvento(paginarEvento: PaginarEvento): void {
        this.pagina = paginarEvento.pagina;
        this.tamanhoPagina = paginarEvento.tamanhoPagina;
        this.ordenar = paginarEvento.ordenar;
        this.ascendente = paginarEvento.ascendente;
    }

    toHttpParams(): HttpParams {
        let httpParams = new HttpParams();

        if (this.pagina !== undefined) {
            httpParams = httpParams.set('pagina', this.pagina.toString());
        }

        if (this.tamanhoPagina !== undefined) {
            httpParams = httpParams.set('tamanhoPagina', this.tamanhoPagina.toString());
        }

        if (this.ordenar !== undefined) {
            httpParams = httpParams.set('ordenar', this.ordenar);
        }

        if (this.ascendente !== undefined) {
            httpParams = httpParams.set('ascendente', this.ascendente.toString());
        }

        return httpParams;
    }
}
