import { GPOLICASTRO } from './../../shared/Utils/Factory/UsuariosFactory';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from './LoginPage';
import { TelaInicial } from '../ST01 - UC00 - Regras gerais/tela-inicial';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';

export class CT55 extends TestCase {
  loginPage: LoginPage;
  telaInicial: TelaInicial;
  usuario: IUsuario;

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.telaInicial = new TelaInicial();
    this.usuario = GPOLICASTRO; // UM USUÁRIO COM LOTAÇÃO NO LDAP E ATIVA NO SIGEP
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.telaInicial.validarLotacaoUsuarioLogado(this.usuario);
  }
}
