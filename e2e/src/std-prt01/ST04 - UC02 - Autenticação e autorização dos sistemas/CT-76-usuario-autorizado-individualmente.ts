import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { TelaInicial } from '../ST01 - UC00 - Regras gerais/tela-inicial';

export class CT76 extends TestCase {
  loginPage: LoginPage;
  usuario: IUsuario;
  telaInicial: TelaInicial;

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.telaInicial = new TelaInicial();
    // O usuário está autorizado individualmente, no mecanismo de controle de acesso (CAC), a utilizar o sistema.
    this.usuario = { login: 'gpolicastro', senha: 'Senha123?' }; // UM USUÁRIO AUTORIZADO INDIVIDUALMENTE
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.telaInicial.validarTelaInicialSistema(this.usuario);
  }
}
