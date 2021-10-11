import { SharedModule } from './../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PJeBaseMaterialModule, ComponentesModule } from 'pje-componentes';
import { SprintCadastroComponent } from './cadastro/cadastro.component';
import { SprintTabelaComponent } from './tabela/tabela.component';
import { DedService } from './../ded/ded.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintService } from './sprints.service';
import { SprintRoutingModule } from './sprint-routing.module';


@NgModule({
  imports: [
    ComponentesModule,
    FlexLayoutModule,
    SprintRoutingModule,
    SharedModule
  ],
  providers: [
    SprintService, DedService
  ],
  declarations: [SprintTabelaComponent, SprintCadastroComponent]
})
export class SprintModule {}
