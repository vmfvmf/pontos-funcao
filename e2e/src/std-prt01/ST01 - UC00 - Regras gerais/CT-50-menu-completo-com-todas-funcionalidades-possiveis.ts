import { TelaInicial } from './tela-inicial';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { PageElement } from '../../shared/trt15-tests/trt15-page-element';
import { element, by } from 'protractor';

export class CT50 extends TestCase {
  telaInicial: TelaInicial;
  loginPage: LoginPage;
  usuario: IUsuario;
  linksMenuCompleto: PageElement[];

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.telaInicial = new TelaInicial();
    this.usuario = { login: 'gpolicastro' }; // USUÁRIO
    this.linksMenuCompleto = [
      new PageElement({ id: 'Item menu exemplo', text: 'Item menu exemplo', cssfinder: 'li[id="Item menu exemplo"]' })
    ];
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.telaInicial.validarMenuCompleto(this.linksMenuCompleto);
  }
}
