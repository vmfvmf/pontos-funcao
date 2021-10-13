import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { DataColumn } from '../data-column';

// Classe intermediária entre DataColumn e DataColumnReordenavelComponent para evitar dependência
// circular entre DataTableComponent e DataColumnReordenavelComponent
export abstract class DataColumnReordenavel extends DataColumn {
  ordenar = false;
  ordenado = false;
  ascendente = true;

  // A coluna reordenável não é ordenável, mas isso pode ser implementado no futuro.
  public fazerOrdenacao(): boolean { return false; }
  public cancelarOrdenacao(): void { }

  // Quaisquer métodos da DataColumnReordenavelComponent que a DataTable
  // precisar invocar devem ser passados para esta classe como abstratos

  public abstract dragDropped(event: CdkDragDrop<string[]>): void;
  public abstract verificaSePodeReordenar(row: object): boolean;

}
