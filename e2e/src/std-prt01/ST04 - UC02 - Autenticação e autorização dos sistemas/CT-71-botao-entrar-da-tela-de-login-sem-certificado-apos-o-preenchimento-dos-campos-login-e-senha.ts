import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';

export class CT71 extends TestCase {
  loginPage: LoginPage;
  usuario: IUsuario;

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.usuario = { login: 'viniciusferraz', senha: 'Senha123?' }; // UM USUÁRIO AUTORIZADO
    this.loginPage.getPageElement('username').text = this.usuario.login;
    this.loginPage.getPageElement('password').text = this.usuario.senha;
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fillForm([this.loginPage.getPageElement('username')]);
  }

  public async eval() {
    await this.loginPage.validarBotaoEntrar();
    await this.loginPage.fillForm([this.loginPage.getPageElement('password')]);
    this.loginPage.getPageElement('kc-login').enabled = true;
    await this.loginPage.validarBotaoEntrar();
  }
}
