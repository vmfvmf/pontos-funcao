import { SistemaService } from './sistema.service';
import { SistemaTabelaModule } from './tabela/tabela.module';
import { SistemaCadastroModule } from './cadastro/cadastro.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaRoutingModule } from './sistema-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SistemaCadastroModule,
    SistemaTabelaModule,
    SistemaRoutingModule
  ],
  providers: [
    SistemaService
  ],
  entryComponents: [SistemaCadastroModule]
})
export class SistemaModule {}
