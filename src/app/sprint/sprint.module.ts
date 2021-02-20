import { DedService } from './../ded/ded.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintService } from './sprints.service';
import { SprintRoutingModule } from './sprint-routing.module';
import { SprintCadastroModule } from './cadastro/cadastro.module';
import { SprintTabelaModule } from './tabela/tabela.module';


@NgModule({
  imports: [
    CommonModule,
    SprintCadastroModule,
    SprintTabelaModule,
    SprintRoutingModule
  ],
  providers: [
    SprintService, DedService
  ],
  entryComponents: [SprintCadastroModule]
})
export class SprintModule {}
