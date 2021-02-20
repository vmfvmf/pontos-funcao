import { CT81 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-81-acesso-autorizado-apos-usuario-nao-autorizado-tentar-acessar-o-sistema';
import { CT80 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-80-link-permitindo-desconectar-na-tela-de-acesso-negado';
import { CT79 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-79-usuario-autorizado-por-categoria';
import { CT78 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-78-usuario-autorizado-por-cargo';
import { CT77 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-77-usuario-autorizado-por-lotacao';
import { CT76 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-76-usuario-autorizado-individualmente';
import { CT75 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-75-usuario-nao-autorizado';
import { CT74 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-74-autenticacao-com-senha-invalida-na-tela-de-login-sem-certificado';
import { CT73 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-73-autenticacao-de-usuario-invalido-na-tela-de-login-sem-certificado';
import { CT72 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-72-botao-entrar-da-tela-de-login-sem-certificado-apos-a-limpeza-dos-campos-login-e-senha';
import { CT71 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-71-botao-entrar-da-tela-de-login-sem-certificado-apos-o-preenchimento-dos-campos-login-e-senha';
import { CT70 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-70-botao-entrar-ao-entrar-na-tela-de-login-sem-certificado';
import { CT69 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-69-campo-senha-da-tela-de-login-sem-certificado';
import { CT68 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-68-campo-login-da-tela-de-login-sem-certificado';
import { CT67 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-67-layout-da-tela-de-acesso-negado';
import { CT66 } from './../std-prt01/ST04 - UC02 - Autenticação e autorização dos sistemas/CT-66-layout-da-tela-de-login-sem-certificado';
import { TestSuite } from '../shared/trt15-tests/trt15-test-suite';

export class ST04UC02Test extends TestSuite {
  constructor() {
    super('ST04UC02Test');
  }
  init() {
    this.addAllTestCases([
      new CT66(),
      new CT67(),
      new CT68(),
      new CT69(),
      new CT70(),
      new CT71(),
      new CT72(),
      new CT73(),
      new CT74(),
      new CT75(),
      new CT76(),
      new CT77(),
      new CT78(),
      new CT79(),
      new CT80(),
      new CT81()
    ]);
  }
}

new ST04UC02Test().run();
