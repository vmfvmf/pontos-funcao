import { ContagemCadastroComponent } from './cadastro/cadastro.component';
import { GrupoComponent } from './cadastro/transacao/grupo/grupo.component';
import { TransacaoComponent } from './cadastro/transacao/transacao.component';
import { TransacaoCadastroComponent } from "./cadastro/transacao/cadastro/cadastro.component";
import { ArquivoReferenciadoComponent } from "./cadastro/arquivo-referenciado/arquivo-referenciado.component";
import { ArquivoReferenciadoCadastroComponent } from "./cadastro/arquivo-referenciado/cadastro/cadastro.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ContagemCadastroBasicoComponent } from "./cadastro/cadastro-basico/cadastro-basico.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ComponentesModule } from "pje-componentes";
import { ContagemTabelaComponent } from "./tabela/tabela.component";
import { SharedModule } from "./../shared/shared.module";

import { ContagemService } from "./contagem.service";
import { ContagemRoutingModule } from "./contagem-routing.module";
import { NgModule } from "@angular/core";
import { SistemaService } from "../sistema/sistema.service";
import { TabelaService } from "./cadastro/arquivo-referenciado/tabela.service";
import { ColunaService } from "./cadastro/arquivo-referenciado/coluna.service";
import { GrupoService } from "./cadastro/transacao/grupo/grupo.service";
import { TransacaoTDService } from "./cadastro/transacao/transacao-td.service";
import { AbstractContagemItemService } from './contagem-item.service';

@NgModule({
  imports: [
    ComponentesModule,
    ContagemRoutingModule,
    SharedModule,
    FlexLayoutModule,
  ],
  providers: [
    ContagemService,
    SistemaService,
    TabelaService,
    ColunaService,
    AbstractContagemItemService,
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
