import { MatBadgeModule } from '@angular/material/badge';
import { GrupoComponent } from "./transacao/grupo/grupo.component";
import { TransacaoCadastroComponent } from "./transacao/cadastro/cadastro.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { ComponentesModule, PJeBaseMaterialModule } from "pje-componentes";
import { ContagemCadastroComponent } from "./cadastro.component";
import { ContagemCadastroBasicoComponent } from "./cadastro-basico/cadastro-basico.component";
import { ArquivoReferenciadoComponent } from "./arquivo-referenciado/arquivo-referenciado.component";
import { ArquivoReferenciadoCadastroComponent } from "./arquivo-referenciado/cadastro/cadastro.component";
import { TransacaoComponent } from "./transacao/transacao.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTabsModule,
    ComponentesModule,
    PJeBaseMaterialModule,
    MatInputModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  declarations: [
    ContagemCadastroComponent,
    ContagemCadastroBasicoComponent,
    ArquivoReferenciadoComponent,
    ArquivoReferenciadoCadastroComponent,
    TransacaoComponent,
    TransacaoCadastroComponent,
    GrupoComponent
  ],
  exports: [ContagemCadastroComponent],
})
export class ContagemCadastroModule {}
