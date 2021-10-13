import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { PaginarEvento } from '../../model/paginar-evento';

@Component({
  selector: 'pje-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent implements OnChanges {
  @Input() tamanhosPaginas: number[] = [5, 10, 15, 20, 50];
  @Input() tamanhoPadrao: number;
  @Input() totalRegistros = 0;
  @Input() linhaDivisoraPaginador = false;
  @Input() ocultarLabelPagina = false;
  @Input() ocultarLabelTamanho = false;

  registrosPorPagina: number = this.tamanhosPaginas[1];
  registroInicial = 1;
  registroFinal: number = this.registrosPorPagina;

  pagina = 1;
  paginas: number[] = [1];
  totalPaginas = 1;
  temProximaPagina = false;
  temPaginaAnterior = false;

  @Output() onPaginar: EventEmitter<PaginarEvento> = new EventEmitter<PaginarEvento>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tamanhoPadrao']) {
      // caso haja uma tamanho de pagina default
      if (this.tamanhosPaginas.indexOf(Number(this.tamanhoPadrao)) > -1) {
        this.registrosPorPagina = Number(this.tamanhoPadrao);
      }
    }

    this.calcularPaginas();
  }

  primeiraPagina(): void {
    this.calcularPaginas(1);
  }
  ultimaPagina(): void {
    this.calcularPaginas(this.totalPaginas);
  }
  paginaAnterior(): void {
    this.calcularPaginas(this.pagina - 1);
  }
  paginaSeguinte(): void {
    this.calcularPaginas(this.pagina + 1);
  }

  calcularPaginas(novaPagina: number = this.pagina): void {
    let chamarOnPaginar = novaPagina !== this.pagina;
    if (novaPagina > 0) {
      this.pagina = novaPagina;
    }

    this.totalPaginas = Math.ceil(this.totalRegistros / this.registrosPorPagina);

    // caso o tamanho da pagina mude e a pagina atual nao exista
    if (this.pagina > this.totalPaginas) {
      if (this.totalPaginas === 0) {
        this.pagina = 1;
      } else {
        this.pagina = this.totalPaginas;
        chamarOnPaginar = true;
      }
    }

    // caso a tabela estiver previamente vazia e volte a ter registros
    if (this.pagina < 1 && this.totalRegistros > 0) {
      this.pagina = 1;
      chamarOnPaginar = true;
    }

    this.registroInicial = (this.pagina - 1) * this.registrosPorPagina + 1;
    this.registroFinal = this.registroInicial + this.registrosPorPagina - 1;

    // caso a ultima pagina possua menos registros que o maximo
    if (this.registroFinal > this.totalRegistros) {
      this.registroFinal = this.totalRegistros;
    }

    this.paginas = Array.from({ length: this.totalPaginas }, (v, k) => k + 1);
    this.temPaginaAnterior = ( (this.pagina <= 1) ? false : true );
    this.temProximaPagina = ( (this.pagina >= this.totalPaginas) ? false : true );

    if (chamarOnPaginar) {
      this.onPaginar.emit(new PaginarEvento(this.pagina, this.registrosPorPagina));
    }
  }

  mudarPagina(): void {
    this.calcularPaginas();
    this.onPaginar.emit(new PaginarEvento(this.pagina, this.registrosPorPagina));
  }

}
