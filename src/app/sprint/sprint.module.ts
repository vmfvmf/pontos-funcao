import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../material.module';
import { SharedModule } from './../shared/shared.module';
import { SprintCadastroComponent } from './cadastro/cadastro.component';
import { SprintTabelaComponent } from './tabela/tabela.component';
import { ProjetoService } from '../projeto/projeto.service';

import { NgModule } from '@angular/core';
import { SprintService } from './sprints.service';
import { SprintRoutingModule } from './sprint-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
    SprintRoutingModule
  ],
  providers: [
    SprintService, ProjetoService
  ],
  declarations: [SprintTabelaComponent, SprintCadastroComponent]
})
export class SprintModule {}
