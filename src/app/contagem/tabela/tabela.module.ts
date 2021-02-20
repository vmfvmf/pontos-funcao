import { ContagemService } from '../contagem.service';
import { ContagemTabelaComponent } from './tabela.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
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
    ContagemService
  ],
  declarations: [ContagemTabelaComponent],
  exports: [ContagemTabelaComponent]
})
export class ContagemTabelaModule {}
