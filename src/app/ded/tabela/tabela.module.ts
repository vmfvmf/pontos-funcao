import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DedTabelaComponent } from './tabela.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { DedService } from '../ded.service';
import { ComponentesModule, PJeBaseMaterialModule } from 'pje-componentes';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatIconModule,
    ComponentesModule,
    PJeBaseMaterialModule,
    MatCardModule
  ],
  providers: [
    DedService
  ],
  declarations: [DedTabelaComponent],
  exports: [DedTabelaComponent]
})
export class DedTabelaModule {}
