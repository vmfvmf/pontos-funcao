import { GPOLICASTRO } from './../../shared/Utils/Factory/UsuariosFactory';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { TelaInicial } from '../ST01 - UC00 - Regras gerais/tela-inicial';

export class CT81 extends TestCase {
  loginPage: LoginPage;
  usuarioN: IUsuario;
  usuarioA: IUsuario;
  telaInicial: TelaInicial;

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.telaInicial = new TelaInicial();
    this.usuarioN = { login: 'clovisvictorio', senha: 'Senha123?' }; // UM USUÁRIO NÃO AUTORIZADO
    this.usuarioA = GPOLICASTRO; // UM USUÁRIO AUTORIZADO
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuarioN);
    await this.loginPage.validarAcessoNegado();
    await this.loginPage.clickButon('link_deslogar');
    this.loginPage.getPageElement('kc-login').enabled = false;
  }

  public async eval() {
    await this.loginPage.validarCampoLogin();
    await this.loginPage.validarCampoSenha();
    await this.loginPage.validarBotaoEntrar();
    await this.loginPage.fazerLogin(this.usuarioA);
    await this.telaInicial.validarTelaInicialSistema(this.usuarioA);
  }
}
