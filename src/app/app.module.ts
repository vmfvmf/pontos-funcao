import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { ContagemModule } from './contagem/contagem.module';
import { SistemaModule } from './sistema/sistema.module';
import { DatePipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
/* tslint:disable-next-line: match-default-export-name */
import localeBr from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { ProjetoModule } from './projeto/projeto.module';
import { SprintModule } from './sprint/sprint.module';
import localePt from '@angular/common/locales/pt';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxWebstorageModule.forRoot({ prefix: 'vmf', separator: ':', caseSensitive: true }),
    CookieModule.forRoot(),
    AngularMaterialModule,
    AppRoutingModule,
    ProjetoModule,
    SharedModule,
    SistemaModule,
    SprintModule,
    ContagemModule
  ],
  exports: [
    AngularMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
  { provide: 'environment', useValue: environment},
  { provide: LOCALE_ID, useValue: 'pt' },
  DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }
