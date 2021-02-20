import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';

export class CT69 extends TestCase {
  loginPage: LoginPage;
  usuario: IUsuario;

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.usuario = { login: 'viniciusferraz' }; // UM USUÁRIO AUTORIZADO
  }

  public async execute() {
    await this.loginPage.visitar();
  }

  public async eval() {
    await this.loginPage.validarCampoSenha();
  }
}
