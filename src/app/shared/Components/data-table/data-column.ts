import { TemplateRef } from '@angular/core';

export abstract class DataColumn {
  header: string;
  value: string;
  width: string;
  headerCentral: boolean;
  conteudoCentral: boolean;
  headerColSpan: number;
  temHeaderColSpan: boolean;
  ordenar: boolean;
  ordenado: boolean;
  ascendente: boolean;

  bodyTemplate: TemplateRef<object>;
  headerTemplate: TemplateRef<object>;

  abstract fazerOrdenacao(): boolean;
  abstract cancelarOrdenacao(): void;
}
