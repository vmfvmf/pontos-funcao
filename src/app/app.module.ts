import { ContagensService } from './contagens/contagens.service';
import { SprintsService } from './sprints/sprints.service';
import { SistemasCadastroComponent } from './sistemas/sistemas-cadastro/sistemas-cadastro.component';
import { SistemasService } from './sistemas/sistemas.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
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
import { TabelasComponent } from './tabelas/tabelas.component';

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
    TabelasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ MessageService, DedsService, SistemasService, SprintsService, HttpClient, ContagensService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
