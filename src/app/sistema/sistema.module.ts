import { SharedModule } from './../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentesModule } from 'pje-componentes';
import { SistemaTabelaComponent } from './tabela/tabela.component';
import { SistemaCadastroComponent } from './cadastro/cadastro.component';
import { SistemaService } from './sistema.service';
import { NgModule } from '@angular/core';
import { SistemaRoutingModule } from './sistema-routing.module';


@NgModule({
  imports: [
    ComponentesModule,
    SistemaRoutingModule,
    FlexLayoutModule,
    SharedModule
  ],
  providers: [
    SistemaService
  ],
  declarations: [ SistemaCadastroComponent, SistemaTabelaComponent ]
})
export class SistemaModule {}
