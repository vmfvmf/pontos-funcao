import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';

export class CT80 extends TestCase {
  loginPage: LoginPage;
  usuario: IUsuario;

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.usuario = { login: 'clovisvictorio', senha: 'Senha123?' }; // UM USUÁRIO NÃO AUTORIZADO
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.loginPage.validarAcessoNegado();
    await this.loginPage.clickButon('link_deslogar');
    await this.loginPage.validarCampoLogin();
    await this.loginPage.validarCampoSenha();
    this.loginPage.getPageElement('kc-login').enabled = false;
    await this.loginPage.validarBotaoEntrar();
  }
}
