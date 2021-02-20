import { GPOLICASTRO } from './../../shared/Utils/Factory/UsuariosFactory';
import { TestCase } from '../../shared/trt15-tests/trt15-test-case';
import { LoginPage } from './LoginPage';
import { IUsuario } from '../../shared/trt15-tests/trt15-iusuario';

export class CT64 extends TestCase{

    loginPage: LoginPage;
    usuario: IUsuario;

    constructor( ) {
        super( null);
        this.name = this.path.basename(__filename);
    }

    public async setup() {
        this.loginPage = new LoginPage();
        this.usuario = GPOLICASTRO; // UM USUÁRIO COM ACESSO AO SISTEMA
    }

    public async execute() {
        await this.loginPage.visitar();
        await this.loginPage.fazerLogin(this.usuario);
        await this.loginPage.clickButon('deslogar');
    }

    public async eval() {
        await this.loginPage.validarPagina();
    }
}