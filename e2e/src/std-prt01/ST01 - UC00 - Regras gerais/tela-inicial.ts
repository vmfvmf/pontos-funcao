import { EC } from './../../shared/trt15-tests/trt15-page-object';
import { Trt15PageObject } from '../../shared/trt15-tests/trt15-page-object';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { browser, element, by } from 'protractor';
import { PageElement } from '../../shared/trt15-tests/trt15-page-element';
import { defaultPageStructure } from '../../shared/trt15-tests/trt15-structure-default';

// export const APP_SERVER = "10.15.220.94:8080";
export const APP_SERVER = 'localhost:4200';
// export const APP_SERVER = "www-hm.trt15.jus.br";
export const BASE_URL =
  'http://' + APP_SERVER + '/app-atualizacaocadastralinativospensionistas/';
// http://satelites-dev.trt15.jus.br/configuracaoextranet/
export const NOME_SISTEMA = 'Pontos de Função';
export const NOME_TRIBUNAL = 'Tribunal Regional do Trabalho da 15ª Região';

export const HOJE =
  ('0' + new Date().getDate()).slice(-2) +
  '/' +
  ('0' + (new Date().getMonth() + 1)).slice(-2) +
  '/' +
  new Date().getFullYear();
export const HORA =
  ('0' + new Date().getHours()).slice(-2) +
  ':' +
  ('0' + new Date().getMinutes()).slice(-2);
export const AGORA = HOJE + ' - ' + HORA;


export class TelaInicial extends Trt15PageObject {
  constructor() {
    super();
    this.addElementToStructure(defaultPageStructure);
  }

  // ESBOÇO 01.01 - CDS-001
  async validarTelaInicialSistema(user: IUsuario) {
    await browser.sleep(1200);
    await expect(
      element(by.css('i[class*="icone-botao-menu"]')).isDisplayed()
    ).toBe(true, 'Deve apresentar o menu completo.'); // 2
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
      await element(by.css('span[class*="nome-usuario"]')).getText()
    ).toContain(
      user.nome,
      'Deve apresentar o nome completo do usuário logado.'
    ); // 6
    await expect(
      element(by.css('div[class*="info-usuario"] span:nth-child(2)')).getText()
    ).toContain(
      user.lotacao,
      'Deve apresentar o nome da lotação do usuário logado.'
    ); // 7
    await expect(
      element(by.css('div[class*="info-usuario"] span:nth-child(3)')).getText()
    ).toContain(
      user.perfil,
      'Deve apresentar o nome do perfil do usuário logado.'
    ); // 8
    await expect(element(by.css('img[class*="foto-perfil"]')).isPresent()).toBe(
      true,
      'Deve apresentar o foto do usuário logado.'
    ); // 9
    await expect(
      element(by.css('i[class*="sign-out-alt"]')).isDisplayed()
    ).toBe(true, 'Deve apresentar o botão desconectar.'); // 10
    await expect(
      element(by.css('div[class*="menu-lateral"]')).isDisplayed()
    ).toBe(true, 'Deve apresentar o menu lateral.'); // 11
    await expect(
      element(by.css('div[class*="app-content"]')).isDisplayed()
    ).toBe(true, 'Deve apresentar o conteúdo.'); // 12
  }

  async validarNomeSistema() {
    await browser.sleep(800);
    await expect(
      element(by.css('section[class="cabecalho"]')).getText()
    ).toContain(NOME_SISTEMA, 'Deve apresentar o nome do sistema.'); // 5
  }

  async validarNomeTribunal() {
    await expect(
      element(
        by.css('trt15-cabecalho mat-toolbar div section:nth-child(1)')
      ).getText()
    ).toContain(NOME_TRIBUNAL, 'Deve apresentar o nome do tribunal.');
  }

  async validarNomeUsuarioLogado(user: IUsuario) {
    await expect(
      await element(by.css('span[class*="nome-usuario"]')).getText()
    ).toContain(
      user.nome,
      'Deve apresentar o nome completo do usuário logado.'
    ); // 6
  }

  async validarLotacaoUsuarioLogado(user: IUsuario) {
    await expect(
      element(by.css('div[class*="info-usuario"] span:nth-child(2)')).getText()
    ).toContain(
      user.lotacao,
      'Deve apresentar o nome da lotação do usuário logado.'
    ); // 7
  }

  async validarLotacaoInativaUsuarioLogado(user: IUsuario) {
    await expect(
      element(by.css('div[class*="info-usuario"] span:nth-child(2)')).getText()
    ).toContain('', 'Não deve apresentar o nome da lotação do usuário logado.'); // 7
  }

  async validarLotacaoNaoLDAPUsuarioLogado(user: IUsuario) {
    await expect(
      element(by.css('div[class*="info-usuario"] span:nth-child(2)')).getText()
    ).toContain('', 'Não deve apresentar o nome da lotação do usuário logado.'); // 7
  }

  async validarUnicoPerfilUsuarioLogado(user: IUsuario) {
    await expect(
      element(by.css('div[class*="info-usuario"] span:nth-child(3)')).getText()
    ).toContain(
      user.perfil,
      'Deve apresentar o nome do único perfil do usuário logado.'
    ); // 8
  }

  async validarPerfisUsuarioLogado(usuario: IUsuario, perfis: string[]) {
    await this.validarUnicoPerfilUsuarioLogado(usuario);
    await new PageElement({ cssfinder: 'span[class="papel-usuario"]:last-child' }).mouseOver();
    await browser.sleep(5000);
    if (
      (await element.all(by.css('div[class*="cdk-overlay-container"] > mat-tooltip-component')))
        .length > 0
    ) {
      await this.forEachPromise(perfis, async (perfil: string) => {
        await expect(
          element(by.css('mat-tooltip-component')).getText()
        ).toContain(perfil, 'Deve apresentar o perfil ' + perfil);
      });
    } else {
      fail('Não apresentou o mattooltip.');
    }
  }

  async validarFotoPerfilUsuario() {
    await expect(
      element(by.css('button[class*="icone-usuario"] img')).isPresent()
    ).toBe(true, 'Deve apresentar a foto do perfil.');
  }

  async validarUsuarioSemFoto() {
    await expect(
      element(by.css('button[class*="icone-usuario"] img')).isPresent()
    ).toBe(false, 'Não deveeve apresentar a foto do perfil.');
  }

  async validarIconesMenuLateral(icons: PageElement[]) {
    await this.forEachPromise(icons, this.validarIconeMenuLateral);
  }

  async validarMenuLateralVazio() {
    await expect(
      (await element.all(by.css('div[class="menu-lateral"] a'))).length
    ).toBe(0, 'Não deve possuir links internos');
  }

  async validarIconeMenuLateral(icon: PageElement) {
    if (!(await icon.elementFinder.isPresent())) {
      fail('Não apresentou o icone de tooltip ' + icon.tooltip);
    }
    await expect(icon.elementFinder.getAttribute('name')).toBe(
      icon.tooltip,
      'Deve apresentar o tooltip ' + icon.tooltip
    ); //
  }

  async validarUnicoIconeMenuLateral(icone: PageElement) {
    await this.validarIconeMenuLateral(icone);
    await expect(
      (await element.all(by.css('div[class="menu-lateral"] a'))).length
    ).toBe(1, 'Deve possuir apenas 1 link interno');
  }

  async validarMenuCompleto(opcoesLi: PageElement[]) {
    await this.getPageElement('botao-menu').focusClick();
    await this.forEachPromise(opcoesLi, this.validarItemMenu);
  }
  async validarUnicoItemMenuCompleto(opcaoLi: PageElement) {
    this.getPageElement('botao-menu').focusClick();
    await this.validarItemMenu(opcaoLi);
    await expect(
      (await element.all(by.css('ul[class*="menu-item-"] li'))).length
    ).toBe(1, 'Deve apresentar o menu global com um único item.');
  }

  private async validarItemMenu(opcaoLi: PageElement) {
    await browser.wait(EC.textToBePresentInElement(opcaoLi.elementFinder, 'a'), 5000);
    await expect(opcaoLi.elementFinder.getText()).toContain(
      opcaoLi.text,
      'Deve apresentar o menu ' + opcaoLi.text
    );
  }

  async validarMenuVazio() {
    await this.getPageElement('botao-menu').focusClick();
    await expect(
      (await element.all(by.css('ul[class*="menu-item-"] li'))).length
    ).toBe(0, 'Deve apresentar o menu global vazio.');
  }
}
