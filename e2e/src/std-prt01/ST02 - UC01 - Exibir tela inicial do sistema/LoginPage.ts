import {
  Trt15PageObject,
  EC
} from '../../shared/trt15-tests/trt15-page-object';
import { loginPageStructure } from './LoginPageStructure';
import { browser, element, by } from 'protractor';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { ENUM_MSG_RN } from '../../shared/Utils/Data/EnumMsgRN';
import { NOME_TRIBUNAL, NOME_SISTEMA } from '../ST01 - UC00 - Regras gerais/tela-inicial';

export class LoginPage extends Trt15PageObject {
  constructor() {
    super();
    this.addElementToStructure(loginPageStructure);
  }

  async visitar() {
    await super.visitar().then(async () => {
      await browser.wait(
        EC.or(
          EC.visibilityOf(this.getPageElement('username').elementFinder),
          EC.elementToBeClickable(this.getPageElement('kc-login').elementFinder)
        )
      );
    });
  }

  async fazerLogin(user: IUsuario) {
    await browser.sleep(400);
    this.getPageElement('username').text = user.login;
    this.getPageElement('password').text = user.senha
      ? user.senha
      : 'Senha123?';
    await this.fillForm([
      this.getPageElement('username'),
      this.getPageElement('password')
    ]);
    await this.clickButon('kc-login');
    await browser.sleep(800);
  }

  async deslogar() {
    // keycloak - 2 homologação e testes
    const keycloakServer = 'keycloak-cds-dev.trt15.jus.br';
    // let keycloakServer = "keycloak-cds-hml-fenix.trt15.jus.br";
    await browser.executeScript('window.localStorage.clear();');
    await browser.manage().deleteAllCookies();
    await browser.get(
      'https:/' +
        keycloakServer +
        '/auth/realms/TRT15/protocol/openid-connect/logout?redirect_uri='
    );
    // await browser.get('http://keycloak-cds-dev.trt15.jus.br/auth/realms/TRT15/protocol/openid-connect/logout?redirect_uri=' + BASE_URL);
    await browser.sleep(500);
  }

  async deslogarPorLink() {
    await this.clickButon('link_deslogar');
  }

  // ESBOÇO 01.02 - CDS-001
  async validarTelaInicialSistemaSemLogin() {
    await browser.sleep(1200);
    if (!(await element(by.id('botao-menu')).isPresent())) {
      fail('Não apresenta o menu global');
    } else {
      await expect(element(by.id('botao-menu')).isDisplayed()).toBe(
        true,
        'Deve apresentar o menu completo.'
      ); // 2
      await expect(
        element(by.css('img[src*="brasao.png"]')).isDisplayed()
      ).toBeTruthy('Deve apresentar o brasão da tela inicial.'); // 3
      await expect(
        element(
          by.css('trt15-cabecalho mat-toolbar div section:nth-child(1)')
        ).getText()
      ).toContain(NOME_TRIBUNAL, 'Deve apresentar o nome do tribunal.'); // 4
      await expect(
        element(
          by.css('trt15-cabecalho mat-toolbar div section:nth-child(2)')
        ).getText()
      ).toContain(NOME_SISTEMA, 'Deve apresentar o nome do sistema.'); // 5
      await expect(
        element(by.css('div[class*="menu-lateral"]')).isDisplayed()
      ).toBe(true, 'Deve apresentar o menu lateral.'); // 11
      await expect(
        element(by.css('div[class*="app-content"]')).isDisplayed()
      ).toBe(true, 'Deve apresentar o conteúdo.'); // 12
    }
  }

  // ESBOÇO 02.01 - CDS-001
  async validarPagina() {
    await expect(
      element(by.css('div[class*="brasao"]')).isDisplayed()
    ).toBeTruthy('Deve apresentar o brasão da tela de login.'); // 3
    await expect(
      element(by.css('p[class*="nomeSistema"]')).getText()
    ).toContain(NOME_SISTEMA, 'Deve apresentar o nome do sistema.'); // 5
    await expect(
      element
        .all(by.css('p[class*="subNomeSistema"]'))
        .first()
        .getText()
    ).toContain(NOME_TRIBUNAL, 'Deve apresentar o nome do tribunal.'); // 4
    await expect(element(by.css('label[for="username"]')).getText()).toContain(
      'Login *',
      'Deve apresentar o label login.'
    ); // 5
    await expect(element(by.css('label[for="password"]')).getText()).toContain(
      'Senha *',
      'Deve apresentar o label senha.'
    );
    await expect(
      element(by.css('input[type="submit"]')).getAttribute('value')
    ).toContain(
      'Entrar',
      'Deve conter o botão com o texto Entrar para o login.'
    );
    await expect(browser.getCurrentUrl()).toContain(
      '.trt15.jus.br/auth/realms/TRT15/',
      'Deve conter o caminho do keycloak.'
    );
  }

  // ESBOÇO 02.02 - CDS-001
  async validarAcessoNegado() {
    await browser.sleep(800);
    await expect(element(by.css('img[src*="brasao.png"]')).isDisplayed()).toBe(
      true,
      'Deve conter o brasão da República Federativa do Brasil.'
    );
    await expect(element(by.css('mat-card-content h2')).getText()).toContain(
      'Acesso Negado',
      'Deve apresentar a mensagem de acesso negado.'
    );
    await expect(
      element(by.css('mat-card-content p[class="error"]')).getText()
    ).toContain(
      ENUM_MSG_RN.RN0204_SEM_ACESSO_A_APLICACAO,
      'Deve apresentar a mensagem de sem acesso à aplicação.'
    );
    // this.validarSnackBar(ENUM_MSG_RN.RN0204_SEM_ACESSO_A_APLICACAO,
    // validar link de retorno a tela de login
    await expect(
      element(
        by.css(
          'mat-card-content a[href*="atualizacaocadastralinativospensionistas"]'
        )
      ).getText()
    ).toContain(
      'Clique aqui para retornar à tela de login.',
      'Deve apresentar a mensagem de sem acesso à aplicação.'
    );
    // "Deve apresentar a mensagem de sem acesso a aplicação no snack bar.");
  }

  async validarErroLogin() {
    await expect(
      element(by.css('div[class*="alert alert-erro"]')).getText()
    ).toContain(
      ENUM_MSG_RN.RN0203_USUARIO_SENHA_INVALIDO,
      'Deve apresentar a mensagem de dados inválidos.'
    );
  }

  async validarCampoLogin() {
    await this.getPageElement('username').validateDefaultFieldValues();
  }

  async validarCampoSenha() {
    await this.getPageElement('password').validateDefaultFieldValues();
  }

  async validarBotaoEntrar() {
    await this.getPageElement('kc-login').validateDefaultFieldValues();
  }
}
