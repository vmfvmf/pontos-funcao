import { GPOLICASTRO } from './../../shared/Utils/Factory/UsuariosFactory';
import { TelaInicial } from '../ST01 - UC00 - Regras gerais/tela-inicial';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from './LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';


export class CT53 extends TestCase {
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
    this.usuario = GPOLICASTRO; // UM USUÁRIO QUALQUER COM ACESSO
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.telaInicial.validarTelaInicialSistema(this.usuario);
  }
}
