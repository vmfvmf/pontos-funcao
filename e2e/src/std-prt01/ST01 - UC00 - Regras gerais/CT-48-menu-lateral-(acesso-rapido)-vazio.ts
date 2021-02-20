import { TelaInicial } from './tela-inicial';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';

export class CT48 extends TestCase {
  telaInicial: TelaInicial;
  telaLogin: LoginPage;
  usuario: IUsuario;

  constructor( ) {
      super(null);
      this.name = this.path.basename(__filename);
  }

  public async setup() {
      this.telaLogin = new LoginPage();
      this.telaInicial = new TelaInicial();
      this.usuario = { login: 'gpolicastro' };
  }

  public async execute() {
    await this.telaLogin.visitar();
      await this.telaLogin.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.telaInicial.validarMenuLateralVazio();
  }
}
