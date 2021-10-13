import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../material.module';
import { SharedModule } from './../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SistemaTabelaComponent } from './tabela/tabela.component';
import { SistemaCadastroComponent } from './cadastro/cadastro.component';
import { SistemaService } from './sistema.service';
import { NgModule } from '@angular/core';
import { SistemaRoutingModule } from './sistema-routing.module';


@NgModule({
  imports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
    SistemaRoutingModule
  ],
  providers: [
    SistemaService
  ],
  declarations: [ SistemaCadastroComponent, SistemaTabelaComponent ]
})
export class SistemaModule {}
