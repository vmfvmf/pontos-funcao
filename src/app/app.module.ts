import { TransacaoTDMensagemTelaService } from './contagens/contagens-detalhes/contagens-transacoes/transacaotdmensagemtela.service';
import { TransacaoService } from './contagens/contagens-detalhes/contagens-transacoes/transacao.service';
import { MensagemTelaService } from './contagens/contagens-detalhes/contagens-transacoes/contagens-mensagens-telas/mensagem-tela.service';
import { GrupoTransacaoService } from './contagens/contagens-detalhes/contagens-transacoes/contagens-grupo-transacoes/grupo_transacao.service';
import { FuncaoDadosService } from './contagens/contagens-detalhes/contagens-funcao-dados/funcao-dados.service';
import { ColunasService } from './contagens/colunas.service';
import { TabelasService } from './contagens/tabelas.service';
import { ContagensService } from './contagens/contagens.service';
import { SprintsService } from './sprints/sprints.service';
import { SistemasCadastroComponent } from './sistemas/sistemas-cadastro/sistemas-cadastro.component';
import { SistemasService } from './sistemas/sistemas.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { DedsService } from './deds/deds.service';
import { MessageService } from './shared/message-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DedsComponent } from './deds/deds.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { DedsCadastroComponent } from './deds/deds-cadastro/deds-cadastro.component';
import { FormsModule } from '@angular/forms';
import { SistemasComponent } from './sistemas/sistemas.component';
import { SprintsComponent } from './sprints/sprints.component';
import { SprintsCadastroComponent } from './sprints/sprints-cadastro/sprints-cadastro.component';
import { ContagensComponent } from './contagens/contagens.component';
import { ContagensCadastroComponent } from './contagens/contagens-cadastro/contagens-cadastro.component';
import { ContagensDetalhesComponent } from './contagens/contagens-detalhes/contagens-detalhes.component';
import { ContagensFuncaoDadosComponent } from './contagens/contagens-detalhes/contagens-funcao-dados/contagens-funcao-dados.component';
import { ContagensTransacoesComponent } from './contagens/contagens-detalhes/contagens-transacoes/contagens-transacoes.component';
import { ContagensGrupoTransacoesComponent } from './contagens/contagens-detalhes/contagens-transacoes/contagens-grupo-transacoes/contagens-grupo-transacoes.component';
import { ContagensMensagensTelasComponent } from './contagens/contagens-detalhes/contagens-transacoes/contagens-mensagens-telas/contagens-mensagens-telas.component';

@NgModule({
  declarations: [
    AppComponent,
    DedsComponent,
    DedsCadastroComponent,
    SistemasComponent,
    SistemasCadastroComponent,
    SprintsComponent,
    SprintsCadastroComponent,
    ContagensComponent,
    ContagensCadastroComponent,
    ContagensDetalhesComponent,
    ContagensFuncaoDadosComponent,
    ContagensTransacoesComponent,
    ContagensGrupoTransacoesComponent,
    ContagensMensagensTelasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    MessageService,
    DedsService,
    SistemasService,
    SprintsService,
    HttpClient,
    ContagensService,
    TabelasService,
    ColunasService,
    FuncaoDadosService,
    GrupoTransacaoService,
    MensagemTelaService,
    TransacaoService,
    TransacaoTDMensagemTelaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
