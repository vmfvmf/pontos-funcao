import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';

export class CT66 extends TestCase {
  loginPage: LoginPage;

  constructor() {
    super(null);
    this.name = this.path.basename(__filename);
  }

  public async setup() {
    this.loginPage = new LoginPage();
  }

  public async execute() {
    await this.loginPage.visitar();
  }

  public async eval() {
    await this.loginPage.validarPagina();
  }
}
