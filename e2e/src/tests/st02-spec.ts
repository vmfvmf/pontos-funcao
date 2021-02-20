import { CT65 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-65-layout-da-tela-inicial-sem-login';
import { CT64 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-64-acionamento-do-botao-desconectar';
import { CT63 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-63-cumulatividade-de-perfis-para-as-funcionalidades-exibidas-no-menu-completo';
import { CT62 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-62-cumulatividade-de-perfis-para-os-icones-do-menu-lateral';
import { CT61 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-61-ausencia-de-foto-do-usuario-logado-exibida-na-tela-inicial-com-login';
import { CT60 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-60-foto-do-usuario-logado-exibida-na-tela-inicial-com-login';
import { CT59 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-59-perfis-de-acesso-multiplos-exibidos-na-tela-inicial-com-login';
import { CT58 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-58-perfil-de-acesso-unico-exibido-na-tela-inicial-com-login';
import { CT57 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-57-lotacao-do-usuario-logado-na-tela-inicial-com-login-esta-vazia-no-LDAP';
import { CT56 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-56-lotacao-inativa-do-usuario-logado-na-tela-inicial-com-login';
import { CT55 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-55-lotação-ativa-do-usuario-logado-na-tela-inicial-com-login';
import { CT54 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-54-nome-do-usuario-logado-na-tela-inicial-com-login';
import { CT53 } from './../std-prt01/ST02 - UC01 - Exibir tela inicial do sistema/CT-53-layout-da-tela-inicial-com-login';
import { TestSuite } from '../shared/trt15-tests/trt15-test-suite';

export class ST02UC01Test extends TestSuite {
  constructor() {
    super('ST02UC01Test');
  }

  init() {
    this.addAllTestCases([
      new CT53(),
      new CT54(),
      new CT55(),
      new CT56(),
      new CT57(),
      new CT58(),
      new CT59(),
      new CT60(),
      new CT61(),
      new CT62(),
      new CT63(),
      new CT64(),
      new CT65()
    ]);
  }
}

new ST02UC01Test().run();
