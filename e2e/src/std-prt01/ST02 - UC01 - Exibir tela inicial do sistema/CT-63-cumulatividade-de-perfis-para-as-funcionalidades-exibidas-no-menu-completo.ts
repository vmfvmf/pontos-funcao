import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from './LoginPage';
import { TelaInicial } from '../ST01 - UC00 - Regras gerais/tela-inicial';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { PageElement } from '../../shared/trt15-tests/trt15-page-element';
import { element, by } from 'protractor';

export class CT63 extends TestCase {
  loginPage: LoginPage;
  telaInicial: TelaInicial;
  usuario: IUsuario;
  linksMenuCompleto: PageElement[];

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.telaInicial = new TelaInicial();
    this.usuario = { login: 'gpolicastro', senha: 'Senha123?' }; // USUÁRIO
    this.linksMenuCompleto = [
      new PageElement({ id: 'Item menu exemplo', text: 'Item menu exemplo', cssfinder: 'li[id="Item menu exemplo"] a'  })
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
