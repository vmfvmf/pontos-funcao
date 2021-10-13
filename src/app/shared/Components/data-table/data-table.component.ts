import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PaginarEvento } from '../../model/paginar-evento';

import { PaginadorComponent } from '../paginador/paginador.component';
import { DataColumn } from './data-column';
import { DataColumnReordenavel } from './data-column-reordenavel/data-column-reordenavel';

@Component({
  selector: 'vmf-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterContentInit, OnChanges {
  @Input() value: object[];
  @Input() listrado = '';
  @Input() totalRegistros: number;
  @Input() tamanhos: number[] = [5, 10, 15, 20, 50];
  @Input() tamanhoPadrao = 10;
  @Input() mensagemVazio = 'Não há registros';
  @Input() linhaDivisoraPaginador = false;
  @Input() nameTabela;
  @Input() larguraMinima: string;
  @Input() corDaLinhaOnClick: string;
  @Input() exibePaginador = true;
  @Input() ocultarLabelPagina = false;
  @Input() ocultarLabelTamanho = false;
  // Para deixar o this acessível na função, passar com: [trClass]="funcao.bind(this)"
  @Input() trClass: Function = undefined;

  @ContentChildren(DataColumn) dataColumnChildren: QueryList<DataColumn>;
  @Output() onPaginar: EventEmitter<PaginarEvento> = new EventEmitter<PaginarEvento>();
  @ViewChild('paginador') paginador: PaginadorComponent;

  colunas: DataColumn[];
  colunaOrdenada: DataColumn; // referencia para a coluna ordenada no momento
  colunaReordenavel: DataColumnReordenavel; // Referência para a coluna reordenável, se houver
  get temReordenacao(): boolean {
    return !!this.colunaReordenavel; // Se tiver uma coluna reordenável, tem reordenação
  }
  /**
   * O drag and drop do Angular precisa que o cdkDragHandle seja um filho imediato do cdkDrag, o que não é o nosso caso.
   * Portanto, usamos a sugestão daqui para fazer o handle funcionar: https://stackoverflow.com/a/60607276/3136474
   * Essa flag deixa o drag desabilitado até que o usuário clique no handle, então o drag é habilitado até que ocorra o drop.
   * Portanto, essa flag é totalmente controlada pelo DataColumnReordenavelComponent
   */
  estaReordenando = false;

  estaCarregando = false;
  linhasMarcadas = new Map<number, boolean>();

  constructor() {
  }

  ngAfterContentInit(): void {
    this.atualizarColunas();
  }

  /**
   * Controle de habilitação da visualização da barra azul.
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['value']) {
      return;
    }
    if (changes['value'].firstChange ) {
      this.exibirCarregamentoDados();
      if ( changes['value'].currentValue ) {
          if (changes['value'].previousValue !== undefined ) {
            this.finalizarCarregamentoDados();
          } else if ( changes['value'].currentValue.length === 0 &&
            !changes['totalRegistros'].currentValue && changes['value'].previousValue === undefined ) {
            this.finalizarCarregamentoDados();
          } else if ( changes['totalRegistros'].currentValue >= 0 ) {
            this.finalizarCarregamentoDados();
          }
      }
    } else {
      this.exibirCarregamentoDados();
      if (changes['value'].currentValue || (changes['value'].currentValue?.length === 0 )) {
        this.finalizarCarregamentoDados();
      }
    }
  }

  public atualizarColunas(): void {
    this.colunas = this.dataColumnChildren.toArray();
    this.colunaReordenavel = <DataColumnReordenavel>this.colunas.find(col => col instanceof DataColumnReordenavel);
  }

  public adicionarMarcacaoEmLinha(indiceLinha: number): void {
    this.linhasMarcadas.set(indiceLinha - 1, true);
  }

  definirCorLinha(indiceLinha: number, impar: boolean): string {
    if (this.trClass) {
      return undefined;
    }
    if (this.linhasMarcadas.get(indiceLinha)) {
      return this.corDaLinhaOnClick;
    } else {
      return impar && this.listrado ? '#F0F0F0' : 'white';
    }
  }

  limparLinhasMarcadas(): void {
    this.linhasMarcadas = new Map<number, boolean>();
  }

  public exibirCarregamentoDados(): void {
    this.limparLinhasMarcadas();
    this.estaCarregando = true;
  }

  private finalizarCarregamentoDados(): void {
    this.estaCarregando = false;
  }

  novaPagina(event: PaginarEvento): void {
    this.exibirCarregamentoDados();
    if (event !== undefined) {
      if (this.colunaOrdenada) {
        this.onPaginar.emit(new PaginarEvento(event.pagina, event.tamanhoPagina,
          this.colunaOrdenada.value, this.colunaOrdenada.ascendente));
      } else {
        this.onPaginar.emit(event);
      }
    }
  }

  ordenar(coluna: DataColumn): void {
    // desabilitar outras colunas que estejam ordenadas
    for (const outrasColunas of this.colunas) {
      if (outrasColunas !== coluna) {
        outrasColunas.cancelarOrdenacao();
      }
    }

    if (coluna.fazerOrdenacao()) {
      this.exibirCarregamentoDados();
      this.colunaOrdenada = coluna;
      this.paginador.mudarPagina();
    }
  }

  temRegistros(): boolean {
    return this.totalRegistros > 0;
  }

  alterarCorDaLinha(event: MouseEvent): void {
    if (!this.corDaLinhaOnClick) {
      return;
    }
    const target = <HTMLElement> event.target;
    let elementoTr = target;
    while (elementoTr && elementoTr.tagName !== 'TR') {
      elementoTr = elementoTr.parentElement;
    }
    if (!elementoTr) {
      return;
    }
    if (((target.tagName === 'TD') || ((target.tagName === 'DIV')
      && !target.matches('.mat-checkbox-inner-container'))) && elementoTr.getAttribute('style')) {
      elementoTr.setAttribute('style', '');
    } else {
      elementoTr.setAttribute('style', 'background-color:' + this.corDaLinhaOnClick);
    }
  }

  retornarApenasColunas(): DataColumn[] {
    let colunasFiltradas: DataColumn[];
    colunasFiltradas = this.colunas.filter(col => !col.temHeaderColSpan);
    return colunasFiltradas;
  }

  getTrClass(row: object): string {
    let trcls = '';
    if (this.trClass) {
      const cls = this.trClass.call(undefined, row);
      trcls = cls ? trcls + ' ' + cls : trcls;
    }

    return trcls;
  }
}
