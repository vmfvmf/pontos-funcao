import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { NgModule } from '@angular/core';
import { DataColumnReordenavelComponent } from './data-column-reordenavel/data-column-reordenavel.component';
import { DataColumnDirective } from './data-column.directive';

@NgModule({
  imports: [ CommonModule, FormsModule],
  declarations: [DataColumnReordenavelComponent, DataColumnDirective, DataTableComponent],
  exports: [DataColumnReordenavelComponent, DataColumnDirective, DataTableComponent]
})
export class DataTableModule {}
