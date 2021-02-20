import { SprintService } from '../sprints.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ComponentesModule, PJeBaseMaterialModule } from 'pje-componentes';
import { SprintTabelaComponent } from './tabela.component';


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
    SprintService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  declarations: [SprintTabelaComponent],
  exports: [SprintTabelaComponent]
})
export class SprintTabelaModule {}
