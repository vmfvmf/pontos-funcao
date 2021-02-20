import { ContagemModule } from './contagem/contagem.module';
import { SistemaModule } from './sistema/sistema.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MessageService, PJeBaseMaterialModule } from 'pje-componentes';
import { registerLocaleData } from '@angular/common';
/* tslint:disable-next-line: match-default-export-name */
import localeBr from '@angular/common/locales/pt';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';

import { AuthorizationModule } from './authorization/authorization.module';
import { MenuModule } from './menu/menu.module';
import { Trt15AcessoNegadoModule, INFO_SISTEMA_TOKEN } from 'trt15-base-app';
import { Trt15HomeModule } from 'trt15-base-app';
import { Trt15SegurancaModule } from 'trt15-base-app';
import { Trt15AssetsModule } from 'trt15-base-app';
import { Trt15AssetsService } from 'trt15-base-app';
import { Trt15IntegracaoModuleRH } from 'trt15-base-app';
import { initializer } from 'trt15-base-app';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './material.module';
import { DedModule } from './ded/ded.module';
import { SprintModule } from './sprint/sprint.module';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'pje', separator: ':', caseSensitive: true }),
    CookieModule.forRoot(),
    PJeBaseMaterialModule,
    AppRoutingModule,
    AngularMaterialModule,
    KeycloakAngularModule,
    AuthorizationModule,
    MenuModule,
    DedModule,
    SistemaModule,
    SprintModule,
    ContagemModule,
    Trt15AcessoNegadoModule,
    Trt15AssetsModule,
    Trt15HomeModule,
    Trt15IntegracaoModuleRH,
    Trt15SegurancaModule
  ],
  providers: [
  { provide: 'environment', useValue: environment},
  { provide: INFO_SISTEMA_TOKEN, useValue: AppComponent.INFO_SISTEMA},
  { provide: LOCALE_ID, useValue: 'pt' },
  {
    provide: APP_INITIALIZER,
    useFactory: initializer,
    multi: true,
    deps: [KeycloakService, Trt15AssetsService]
  },
  DatePipe,
  MessageService,
  Trt15AssetsService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
