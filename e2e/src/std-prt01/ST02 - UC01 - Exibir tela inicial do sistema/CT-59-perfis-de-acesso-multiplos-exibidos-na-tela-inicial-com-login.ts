import { GPOLICASTRO } from './../../shared/Utils/Factory/UsuariosFactory';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from './LoginPage';
import { TelaInicial } from '../ST01 - UC00 - Regras gerais/tela-inicial';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';

export class CT59 extends TestCase {
  loginPage: LoginPage;
  telaInicial: TelaInicial;
  usuario: IUsuario;
  perfis: string[];

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
    this.telaInicial = new TelaInicial();
    this.usuario = GPOLICASTRO; // USUÁRIO COM 3 PERFIS REGISTRADOS NO SISTEMA
    this.perfis = [
      'Administrador',
      'Secretaria-Geral Judiciária',
      'Vice-Presidência Administrativa'
    ]; // PERFIS A SEREM VALIDADOS
  }

  public async execute() {
    await this.loginPage.visitar();
    await this.loginPage.fazerLogin(this.usuario);
  }

  public async eval() {
    await this.telaInicial.validarPerfisUsuarioLogado(
      this.usuario,
      this.perfis
    );
  }
}
