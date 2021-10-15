import { AngularMaterialModule } from './../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransacaoService } from './cadastro/transacao/transacao.service';
import { ArquivoReferenciadoService } from './cadastro/arquivo-referenciado/arquivo-referenciado.service';
import { ContagemCadastroComponent } from './cadastro/cadastro.component';
import { GrupoComponent } from './cadastro/transacao/grupo/grupo.component';
import { TransacaoComponent } from './cadastro/transacao/transacao.component';
import { TransacaoCadastroComponent } from "./cadastro/transacao/cadastro/cadastro.component";
import { ArquivoReferenciadoComponent } from "./cadastro/arquivo-referenciado/arquivo-referenciado.component";
import { ArquivoReferenciadoCadastroComponent } from "./cadastro/arquivo-referenciado/cadastro/cadastro.component";
import { ContagemCadastroBasicoComponent } from "./cadastro/cadastro-basico/cadastro-basico.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContagemTabelaComponent } from "./tabela/tabela.component";
import { SharedModule } from "./../shared/shared.module";

import { ContagemService } from "./contagem.service";
import { ContagemRoutingModule } from "./contagem-routing.module";
import { NgModule } from "@angular/core";
import { SistemaService } from "../sistema/sistema.service";
import { GrupoService } from "./cadastro/transacao/grupo/grupo.service";
import { TransacaoTDService } from "./cadastro/transacao/transacao-td.service";
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    ContagemRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [
    ContagemService,
    SistemaService,
    TransacaoService,
    ArquivoReferenciadoService,
    GrupoService,
    TransacaoTDService,
  ],
  declarations: [
    ContagemTabelaComponent,
    ContagemCadastroComponent,
    ContagemCadastroBasicoComponent,
    ArquivoReferenciadoCadastroComponent,
    ArquivoReferenciadoComponent,
    TransacaoCadastroComponent,
    TransacaoComponent,
    GrupoComponent
  ],
})
export class ContagemModule {}
