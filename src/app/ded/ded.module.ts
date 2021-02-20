import { DedRoutingModule } from './ded-routing.module';
import { DedCadastroModule } from './cadastro/cadastro.module';
import { DedService } from './ded.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DedTabelaModule } from './tabela/tabela.module';


@NgModule({
  imports: [
    CommonModule,
    DedTabelaModule,
    DedCadastroModule,
    DedRoutingModule
  ],
  providers: [
    DedService
  ],
  entryComponents: [DedCadastroModule]
})
export class DedModule {}
