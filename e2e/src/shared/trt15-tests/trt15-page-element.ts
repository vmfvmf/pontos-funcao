import { ENUM_PAGE_ELEMENT_TYPE } from '../Utils/Data/EnumPageElementType';
import {
  ElementFinder,
  Key,
  ExpectedConditions,
  browser,
  element,
  by
} from 'protractor';

const EC = ExpectedConditions;
const DESTACA_INTERACAO_ELEMENTOS = false;

export interface PageElementInterface {
  id?: string;
  cssfinder?: string;
  cssContainingText?: {css: string, text: string};
  buttonTextFinder?: string;
  tagNameFinder?: string;
  nameFinder?: string;
  tooltip?: string;
  searchable?: boolean;
  required?: boolean;
  maxlenght?: number;
  label?: string;
  text?: string;
  type?: ENUM_PAGE_ELEMENT_TYPE;
  defaultValue?: string;
  enabled?: boolean;
}

export class PageElement implements PageElementInterface {
  id: string;
  elementFinder: ElementFinder;
  tooltip?: string;
  searchable?: boolean;
  label?: string;
  maxlenght?: number;
  required?: boolean;
  type?: ENUM_PAGE_ELEMENT_TYPE;
  text?: string;
  defaultValue?: string;
  enabled?: boolean;

  constructor(iPageElement: PageElementInterface) {
    this.id = iPageElement.id;
    this.elementFinder =
      typeof iPageElement.cssfinder !== 'undefined' ? element(by.css(iPageElement.cssfinder)) :
      typeof iPageElement.cssContainingText !== 'undefined' ?
        element(by.cssContainingText(iPageElement.cssContainingText.css, iPageElement.cssContainingText.text)) :
      typeof iPageElement.buttonTextFinder !== 'undefined' ? element(by.buttonText(iPageElement.buttonTextFinder)) :
      typeof iPageElement.tagNameFinder !== 'undefined' ? element.all(by.tagName(iPageElement.tagNameFinder)).first() :
      typeof iPageElement.nameFinder !== 'undefined' ? element(by.name(iPageElement.nameFinder)) :
      element(by.id(this.id));
    this.tooltip = iPageElement.tooltip;
    this.label = iPageElement.label;
    this.required = iPageElement.required;
    this.searchable = iPageElement.searchable;
    this.maxlenght = iPageElement.maxlenght;
    this.type = iPageElement.type;
    this.label = iPageElement.label;
    this.text = iPageElement.text;
    this.enabled = iPageElement.enabled;
    this.defaultValue = iPageElement.defaultValue;
  }

  async focusElement() {
    await browser.wait(
      EC.and(
        EC.invisibilityOf(element.all(by.id('overlay')).first()),
        EC.invisibilityOf(element.all(by.id('overlay')).last()),
        EC.not(EC.visibilityOf(element.all(by.id('overlay')).first())),
        EC.not(EC.visibilityOf(element.all(by.id('overlay')).last())),
        EC.visibilityOf(this.elementFinder)
      )
    ).catch((ex: any) => console.log(ex));
    await browser.executeScript(
      'arguments[0].scrollIntoView();',
      this.elementFinder.getWebElement()
    ).catch((ex: any) => console.log(ex));
  }

  protected async showElement() {
    if (DESTACA_INTERACAO_ELEMENTOS) {
      await browser.executeScript(
        'arguments[0].scrollIntoView();',
        this.elementFinder.getWebElement()
      );
      await browser.executeScript(
        'arguments[0].setAttribute("style", "border: 2px solid red;" );',
        this.elementFinder.getWebElement()
      );
      await browser.sleep(700);
      await browser.executeScript(
        'arguments[0].setAttribute("style", "border: none;" );',
        this.elementFinder.getWebElement()
      );
      await browser.sleep(100);
    }
  }

  regexTreatment(dado: string) {
    return dado
      .replace(/\./, '\\.')
      .split(/\//)
      .join('\\/')
      .replace(/\]/, '\\]')
      .replace(/\[/, '\\[')
      .replace(/\$/, '\\$');
  }

  formatCpfCnpj(cpfCnpj) {
    return cpfCnpj.length === 11
      ? cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      : cpfCnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        );
  }

  formatDate(ddmmaaaa: string) {
    return ddmmaaaa.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  }

  async mouseOver() {
    await browser.actions().mouseMove(this.elementFinder).perform();
    await browser.sleep(800);
  }

  async focusGetText(): Promise<string> {
    await this.focusElement();
    return await this.elementFinder.getText();
  }

  async focusCleanAndWrite(text = this.text) {
    if (typeof text === 'undefined') { return; }
    await this.showElement();
    await this.focusElement();

    await this.elementFinder.sendKeys(Key.chord(Key.CONTROL, 'a'));
    await this.elementFinder.sendKeys(Key.DELETE);
    if (text.length > 0) { await this.elementFinder.sendKeys(text); }
  }

  async focusClick() {
    await this.focusElement();
    await this.showElement();
    await browser.wait(EC.elementToBeClickable(this.elementFinder), 5000);
    await this.elementFinder.click();
  }

  async selectByText(texto: string, optionTagName = 'mat-option') {
    if (typeof texto === 'undefined') {
      return;
    }

    if (this.elementFinder) {
      await this.showElement();
      await this.focusClick();
    }
    await browser.sleep(100);
    await new PageElement({
      cssContainingText: { css: optionTagName, text: texto }
    }).focusClick();
  }

  async focusMarkUnmark(marca: boolean) {
    if (typeof marca === 'undefined') { return; }
    await this.focusElement().then(async () => {
      await this.showElement();
      await browser.wait(EC.elementToBeClickable(this.elementFinder));
      if (
        ((await this.elementFinder
          .element(by.css('input'))
          .getAttribute('checked')) &&
          !marca) ||
        (!(await this.elementFinder
          .element(by.css('input'))
          .getAttribute('checked')) &&
          marca)
      ) {
        await this.focusClick();
      }
    });
  }

  async selectIcon() {
    if (typeof this.text === 'undefined') { return; }
    await this.focusClick();
    await new PageElement({
      id: null,
      cssfinder: '[placeholder="Digite um termo de busca"]'
    }).focusCleanAndWrite();
    await new PageElement({
      id: null,
      cssfinder: 'button[title="' + this.text + '"]'
    }).focusClick();
  }

  async closeSnackBar() {
    await new PageElement({
      id: null,
      buttonTextFinder: 'X'
    }).focusClick();
  }

  async validateSnackBar() {
    await browser.sleep(800);
    await this.focusElement();
    await expect(this.focusGetText()).toContain(
      this.text,
      'Deve conter: ' + this.text
    );
    await this.closeSnackBar();
  }
  async validateDefaultFieldValues() {
    await browser.sleep(800);
    await this.focusElement();
    if (typeof this.defaultValue !== 'undefined') { await expect(this.elementFinder.getText()).toBe(
      this.defaultValue,
      'Deve conter o texto:  ' + this.defaultValue
    );
    }
    if (typeof this.required !== 'undefined') { await expect(this.elementFinder.getAttribute('required')).toBe(
      this.required,
      'Este campo deve ser ' + (this.required ? ' obrigatório' : 'opcional')
    );
    }
    switch (this.type) {
      case ENUM_PAGE_ELEMENT_TYPE.INPUT_TEXT:
        await expect(this.elementFinder.getAttribute('type')).toBe(
          'text',
          'Deve ser do tipo text.'
        );
        if (typeof this.maxlenght !== 'undefined') { await expect(this.elementFinder.getAttribute('maxlength')).toBe(
          this.maxlenght,
          'Deve ter no máximo ' + this.maxlenght + ' caracteres.'
        );
        }
        break;
      case ENUM_PAGE_ELEMENT_TYPE.INPUT_PASSWORD:
        await expect(this.elementFinder.getAttribute('type')).toBe(
          'password',
          'Deve ser do tipo password.'
        );
        if (typeof this.maxlenght !== 'undefined') { await expect(this.elementFinder.getAttribute('maxlength')).toBe(
          this.maxlenght,
          'Deve ter no máximo ' + this.maxlenght + ' caracteres.'
        );
        }
        break;
        case ENUM_PAGE_ELEMENT_TYPE.BUTTON:

          break;
    }
    if (typeof this.enabled !== 'undefined') { await expect(this.elementFinder.isEnabled()).toBe(
      this.enabled,
      'O campo deve estar ' + (this.enabled ? 'habilitado' : 'desabilitado') + '.'
    );
    }

  }
}
