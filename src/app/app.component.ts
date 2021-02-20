import { Component } from '@angular/core';
import { version } from '../../package.json';
import { InfoSistema } from 'trt15-base-app';

@Component({
  selector: 'app-root',
  template: `
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public static INFO_SISTEMA: InfoSistema = {
    nome: 'Pontos de Função',
    versao: version
  };
}
