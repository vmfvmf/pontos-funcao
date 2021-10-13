
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ContentChild, forwardRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { DataColumn } from '../data-column';
import { DataTableComponent } from '../data-table.component';
import { DataColumnReordenavel } from './data-column-reordenavel';

@Component({
  selector: 'vmf-data-column-reordenavel',
  templateUrl: './data-column-reordenavel.component.html',
  styleUrls: ['./data-column-reordenavel.component.scss'],
  providers: [{provide: DataColumn, useExisting: forwardRef(() => DataColumnReordenavelComponent)}]
})
export class DataColumnReordenavelComponent extends DataColumnReordenavel {
  @Input() header: string;
  @Input() headerCentral = false;
  /**
   * Se os botões de reordenar devem ficar sempre visíveis.
   * Por padrão, são exibidos apenas quando der hover na linha
   */
  @Input() botoesSempreVisiveis = false;

  // Se os botões de reordenar devem ficar na vertical
  private _botoesNaVertical = true;

  get botoesNaVertical(): boolean {
    return this._botoesNaVertical;
  }

  @Input() set botoesNaVertical(val: boolean) {
    this._botoesNaVertical = val;
    this.width = val ? '40px' : '60px';
  }

  @Input() botoesExibirDragDrop = true; // Se o botão de drag/drop deve ficar visível
  /**
   * Tamanho dos botões de reordenar
   * https://fontawesome.com/v4.7.0/examples/#larger
   */
  @Input() botoesTamanho: 'sm'|'normal'|'lg'|'2x'|'3x'|'4x'|'5x' = 'lg';

  // Se os callbacks retornarem true, o array é reordenado ou os dados são recarregados, conforme necessidade
  // reordenarParaCima(row: object): boolean | Observable<boolean>
  @Input() reordenarParaCima: Function = undefined;
  // reordenarParaBaixo(row: object): boolean | Observable<boolean>
  @Input() reordenarParaBaixo: Function = undefined;
  // O callback de Drop é chamado mesmo quando o elemento é largado no mesmo local de onde foi arrastado
  // reordenarDrop(row: object, indiceNovo: number, indiceAntigo: number): boolean | Observable<boolean>
  @Input() reordenarDrop: Function = undefined;

  @ViewChild('body', {static: false}) bodyTemplate: TemplateRef<object>;
  @ContentChild('header', {static: false}) headerTemplate: TemplateRef<object>;

  constructor(private dataTable: DataTableComponent) {
    super();
  }

  public verificaSePodeReordenar(row: object): boolean {
    return !!row && (typeof row['podeReordenar'] === 'undefined' || row['podeReordenar']);
  }

  public verificaSePodeReordenarParaCima(row: object): boolean {
    if (!this.verificaSePodeReordenar(row)) {
      return false;
    }
    // Por padrão, a primeira linha da primeira página não pode subir mais
    const idx = this.dataTable.value.indexOf(row);
    if (!this.dataTable.paginador || this.dataTable.paginador.pagina === 1) {
      return idx !== 0;
    }
    if (idx > 0) { // Se não for a primeira linha, verifica se pode reordenar a anterior
      return this.verificaSePodeReordenar(this.dataTable.value[idx - 1]);
    }
    return true;
  }

  public verificaSePodeReordenarParaBaixo(row: object): boolean {
    if (!this.verificaSePodeReordenar(row)) {
      return false;
    }
    // Por padrão, a última linha da última página não pode descer mais
    const idx = this.dataTable.value.indexOf(row);
    if (!this.dataTable.paginador || this.dataTable.paginador.pagina === this.dataTable.paginador.totalPaginas) {
      return idx !== this.dataTable.value.length - 1;
    }
    if (idx < this.dataTable.value.length - 1) { // Se não for a última linha, verifica se pode reordenar a próxima
      return this.verificaSePodeReordenar(this.dataTable.value[idx + 1]);
    }
    return true;
  }

  public mousedownDragHandle(): void {
    // Ver comentário no atributo estaReordenando
    this.dataTable.estaReordenando = true;
  }

  public dragDropped(event: CdkDragDrop<string[]>): void {
    // Ver comentário no atributo estaReordenando
    this.dataTable.estaReordenando = false;
    const reordenar = () => moveItemInArray(this.dataTable.value, event.previousIndex, event.currentIndex);

    let deveReordenar: boolean | Observable<boolean> = true;
    if (this.reordenarDrop) {
      deveReordenar = this.reordenarDrop.call(undefined,
          this.dataTable.value[event.previousIndex], event.currentIndex, event.previousIndex);
    }
    this.chamarCallbackSeVerdadeiro(deveReordenar, reordenar);
  }

  public cliqueReordenarParaCima(row: object): void {
    const reordenar = () => {
      const indiceLinha = this.dataTable.value.indexOf(row);
      if (indiceLinha !== 0) { // Primeira linha da tabela
        const outraLinha = this.dataTable.value[indiceLinha - 1];
        this.dataTable.value.splice(indiceLinha - 1, 2, row, outraLinha);
      } else if (this.dataTable.paginador) { // Se tiver paginador, recarrega os dados
        this.dataTable.exibirCarregamentoDados();
        this.dataTable.paginador.mudarPagina();
      }
    };

    let deveReordenar: boolean | Observable<boolean> = true;
    if (this.reordenarParaCima) {
      deveReordenar = this.reordenarParaCima.call(undefined, row);
    }
    this.chamarCallbackSeVerdadeiro(deveReordenar, reordenar);
  }

  public cliqueReordenarParaBaixo(row: object): void {
    const reordenar = () => {
      const indiceLinha = this.dataTable.value.indexOf(row);
      if (indiceLinha !== (this.dataTable.value.length - 1)) { // Última linha da tabela
        const outraLinha = this.dataTable.value[indiceLinha + 1];
        this.dataTable.value.splice(indiceLinha, 2, outraLinha, row);
      } else if (this.dataTable.paginador) { // Se tiver paginador, recarrega os dados
        this.dataTable.exibirCarregamentoDados();
        this.dataTable.paginador.mudarPagina();
      }
    };

    let deveReordenar: boolean | Observable<boolean> = true;
    if (this.reordenarParaBaixo) {
      deveReordenar = this.reordenarParaBaixo.call(undefined, row);
    }
    this.chamarCallbackSeVerdadeiro(deveReordenar, reordenar);
  }

  private chamarCallbackSeVerdadeiro(teste: boolean | Observable<boolean>, callback: Function): void {
    if (teste instanceof Observable) {
      teste.subscribe((next) => {
        if (next) {
          callback();
        }
      });
    } else if (teste) {
      callback();
    }
  }

}
