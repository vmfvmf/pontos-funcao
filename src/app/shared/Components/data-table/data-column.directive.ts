import {
  AfterContentInit, ContentChild, ContentChildren, Directive, forwardRef, Input, QueryList, TemplateRef
} from '@angular/core';
import { DataColumn } from './data-column';

@Directive({
  /* tslint:disable-next-line: directive-selector */
  selector: 'vmf-data-column',
  providers: [{provide: DataColumn, useExisting: forwardRef(() => DataColumnDirective)}]
})
export class DataColumnDirective extends DataColumn implements AfterContentInit {
  @Input() header;
  @Input() value;
  @Input() width;
  @Input() headerCentral = false;
  @Input() conteudoCentral = false;
  @Input() headerColSpan;
  @Input() temHeaderColSpan = false;
  @Input() ordenar = false;
  ordenado = false;
  ascendente = true;

  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<object>>;
  @ContentChild('body') bodyTemplate: TemplateRef<object>;
  @ContentChild('header') headerTemplate: TemplateRef<object>;

  constructor() {
    super();
  }

  ngAfterContentInit(): void {
    if (this.bodyTemplate === undefined && this.headerTemplate === undefined) {
      const allTemplates: TemplateRef<object>[] = this.templates.toArray();
      if (allTemplates) {
        // caso haja um template sem marcacao, esse sera o template para o corpo
        this.bodyTemplate = allTemplates[0];
      }
    }
  }

  fazerOrdenacao(): boolean {
    if (this.ordenar) {
      if (!this.ordenado) {
        this.ordenado = true;
        this.ascendente = true;
      } else {
        this.ascendente = !this.ascendente;
      }
      return true;
    }

    return false;
  }

  cancelarOrdenacao(): void {
    this.ordenado = false;
  }

}
