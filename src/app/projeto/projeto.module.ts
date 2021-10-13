import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../material.module';
import { ProjetoCadastroComponent } from './cadastro/cadastro.component';
import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoService } from './projeto.service';
import { NgModule } from '@angular/core';
import { ProjetoTabelaComponent } from './tabela/tabela.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
    ProjetoRoutingModule
  ],
  providers: [
    ProjetoService
  ],
  declarations: [ ProjetoCadastroComponent, ProjetoTabelaComponent ]
})
export class ProjetoModule {}
