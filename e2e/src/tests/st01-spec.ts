import { CT52 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-52-menu-completo-vazio';
import { CT51 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-51-menu-completo-com-apenas-uma-funcionalidade';
import { CT50 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-50-menu-completo-com-todas-funcionalidades-possiveis';
import { CT49 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-49-menu-lateral-(acesso-rapido)-com-apenas-um-icone';
import { CT48 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-48-menu-lateral-(acesso-rapido)-vazio';
import { CT47 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-47-menu-lateral-(acesso-rapido)-com-todos-os-icones-possiveis';
import { CT46 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-46-nome-do-tribunal-apresentado-na-tela-inicial';
import { CT45 } from './../std-prt01/ST01 - UC00 - Regras gerais/CT-45-nome-do-sistema-apresentado-na-tela-inicial';
import { TestSuite } from '../shared/trt15-tests/trt15-test-suite';
import { browser } from 'protractor';

export class ST01Test extends TestSuite {
  constructor() {
    super('ST01Test');
  }

  init() {
    this.addAllTestCases([
      new CT45(),
      new CT46(),
      new CT47(),
      new CT48(),
      new CT49(),
      new CT50(),
      new CT51(),
      new CT52()
    ]);
  }
}

 new ST01Test().run();
