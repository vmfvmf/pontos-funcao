import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSistema } from './menu-sistema';
import { MENU_SISTEMA_TOKEN } from 'trt15-base-app';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: MENU_SISTEMA_TOKEN, useValue: MenuSistema.MENU}
  ]
})
export class MenuModule { }
