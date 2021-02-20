import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PERFIS_SISTEMA_TOKEN } from 'trt15-base-app';
import { PerfisSistema } from './perfis-sistema';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: PERFIS_SISTEMA_TOKEN, useValue: PerfisSistema.PERFIS}
  ]
})
export class AuthorizationModule { }
