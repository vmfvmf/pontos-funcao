import { SimNao } from './../../shared/Utils/Data/Utils';
import { TelaInicial } from './tela-inicial';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from '../ST02 - UC01 - Exibir tela inicial do sistema/LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';
import { PageElement } from '../../shared/trt15-tests/trt15-page-element';
import { element, by } from 'protractor';

export class CT47 extends TestCase {
  telaInicial: TelaInicial;
    telaLogin: LoginPage;
    usuario: IUsuario;
    todosIcones: PageElement[];

    constructor( ) {
        super(null);
        this.name = this.path.basename(__filename);
    }

    public async setup() {
        this.telaLogin = new LoginPage();
        this.telaInicial = new TelaInicial();
        this.usuario = { login: 'gpolicastro' };
        this.todosIcones = [
          new PageElement({ id: 'Item menu exemplo', tooltip: 'Item menu exemplo', nameFinder: 'Item menu exemplo' })
        ];
    }

    public async execute() {
      await this.telaLogin.visitar();
        await this.telaLogin.fazerLogin(this.usuario);
    }

  public async eval() {
    await this.telaInicial.validarIconesMenuLateral(this.todosIcones);
  }
}
