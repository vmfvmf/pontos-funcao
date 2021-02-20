
// File: PageObjectType.ts
// Author: Vinicius Martins Ferraz
// Date: 30/09/2019

import {
  browser,
  by,
  ExpectedConditions,
  ElementFinder,
  ElementArrayFinder
} from 'protractor';
import { ENUM_PAGE_ELEMENT_TYPE } from '../Utils/Data/EnumPageElementType';
import { PageElement, PageElementInterface } from './trt15-page-element';
import { BASE_URL } from '../../std-prt01/ST01 - UC00 - Regras gerais/tela-inicial';


export const EC = ExpectedConditions;

export abstract class Trt15PageObject {
  pageStructure: Array<PageElement> = new Array<PageElement>();

  constructor() {
    browser.waitForAngularEnabled(false);
  }

  public addElementToStructure(structure: Array<PageElementInterface>) {
    structure.forEach((element: PageElementInterface) =>
      this.pageStructure.push(new PageElement(element))
    );
  }

  async visitar() {
    await browser.get(BASE_URL);
  }

  protected fecharAbaAtualAbrirNova() {
    browser.executeScript('window.open()');
    browser.getAllWindowHandles().then(function(handles) {
      browser.driver.close();
      browser.switchTo().window(handles[1]);
    });
    browser.get(BASE_URL + 'home');
  }

  protected limparSessao() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.driver.manage().deleteAllCookies();
    return this;
  }

  protected async restartBrowser() {
    await browser.restart();
    await browser.waitForAngularEnabled(false);
  }

  async clickButon(id: any) {
    await this.getPageElement(id).focusClick();
  }
  /**
   * Incluir um novo campo na lista de campos da página de pesquisa
   * @param iPageElement o objeto do tipo PageElementInterface
   */
  addPageElement(iPageElement: PageElementInterface) {
    this.pageStructure.push(new PageElement(iPageElement));
  }

  getPageElement(id: string): PageElement {
    return this.pageStructure.find(pageElement => pageElement.id === id);
  }

  async fillForm(structure: Array<PageElement>) {
    await browser.sleep(800);
    await this.forEachPromise(structure, async (element: PageElement) => {
      if (typeof element.type !== 'undefined') {
        switch (element.type) {
          case ENUM_PAGE_ELEMENT_TYPE.INPUT_TEXT:
          case ENUM_PAGE_ELEMENT_TYPE.INPUT_PASSWORD:
            await element.focusCleanAndWrite();
            break;
          case ENUM_PAGE_ELEMENT_TYPE.CHECK_BOX: {
            await element.focusMarkUnmark(
              element.text.toUpperCase().charAt(0) === 'S'
            );
            break;
          }
          case ENUM_PAGE_ELEMENT_TYPE.RADIO_BUTTON: {
            await element.focusClick();
            break;
          }
          case ENUM_PAGE_ELEMENT_TYPE.MAT_SELECTBOX: {
            await element.selectByText(element.text);
            break;
          }
          case ENUM_PAGE_ELEMENT_TYPE.ICONE_SELECT: {
            await element.selectIcon();
            break;
          }
          default: {
            break;
          }
        }
      }
    });
    await browser.sleep(800);
  }

  async AdcionarRemoverVetoresDeVetor(
    vetorOriginal: any[],
    vetorAdicionar: any[],
    vetorSubtrair: any[]
  ) {
    const result = vetorOriginal.slice();
    if (vetorAdicionar) { result.push(vetorAdicionar); }
    if (vetorSubtrair) {
      result.filter(async item => {
        return vetorSubtrair.indexOf(item) > -1;
      });
    }
    return result;
  }

  protected async forEachPromise(itemsArray: Array<any>, fn: (item: any) => any) {
    return itemsArray.reduce(function(promise, item) {
      return promise.then(function() {
        return fn(item);
      });
    }, Promise.resolve());
  }

  protected async forEachPromiseFromElementArray(
    elementArray: ElementArrayFinder,
    fn: (item: ElementFinder) => any
  ) {
    return elementArray.reduce(function(acc: any, item: ElementFinder) {
      return fn(item);
    }, Promise.resolve());
  }

  /**
   * Método que compara o único resultado da pesquisa com as definições do parâmetro informado.
   * @param app Definição do resultado a ser comparado com o primeiro, e único, resultado da pesquisa.
   */
  async validarUnicoResultadoPesquisa(
    tabelaResultado: ElementFinder,
    dados: Array<string>
  ) {
    // valida tabela e colunas
    await browser.sleep(800);
    let i = 0;
    await this.forEachPromiseFromElementArray(
      tabelaResultado.all(by.css('tbody tr td')),
      async (td: ElementFinder) => {
        const linha = td.get(i++);
        await expect(linha.getText()).toContain(
          dados[i],
          'Deve apresentar o dado ' + dados[i] + '.'
        );
      }
    );
  }
}
