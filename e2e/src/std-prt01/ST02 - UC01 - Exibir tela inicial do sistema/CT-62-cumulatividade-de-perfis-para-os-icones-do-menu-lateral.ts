import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from './LoginPage';
import { TelaInicial } from '../ST01 - UC00 - Regras gerais/tela-inicial';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { PageElement } from '../../shared/trt15-tests/trt15-page-element';
import { element, by } from 'protractor';

export class CT62 extends TestCase {
  loginPage: LoginPage;
  telaInicial: TelaInicial;
  usuario: IUsuario;
  linksMenuLateral: PageElement[];

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.telaInicial = new TelaInicial();
    this.usuario = { login: 'gpolicastro' }; // USUÁRIO
    this.linksMenuLateral = [
      new PageElement({
        id: 'Item menu exemplo',
        nameFinder: 'Item menu exemplo',
        tooltip: 'Item menu exemplo'
      })
    ];
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.telaInicial.validarIconesMenuLateral(this.linksMenuLateral);
  }
}
