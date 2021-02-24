import { ContagemItemService } from './contagem-item.service';

import { ContagemTabelaModule } from "./tabela/tabela.module";
import { ContagemService } from "./contagem.service";
import { ContagemRoutingModule } from "./contagem-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SistemaService } from "../sistema/sistema.service";
import { ContagemCadastroModule } from "./cadastro/cadastro.module";
import { TabelaService } from "./cadastro/arquivo-referenciado/tabela.service";
import { ColunaService } from "./cadastro/arquivo-referenciado/coluna.service";
import { GrupoService } from "./cadastro/transacao/grupo/grupo.service";
import { TransacaoTDService } from './cadastro/transacao/transacao-td.service';

@NgModule({
  imports: [
    CommonModule,
    ContagemTabelaModule,
    ContagemCadastroModule,
    ContagemRoutingModule,
  ],
  providers: [
    ContagemService,
    SistemaService,
    TabelaService,
    ColunaService,
    ContagemItemService,
    GrupoService,
    TransacaoTDService
  ],
  entryComponents: [ContagemCadastroModule],
})
export class ContagemModule {}
