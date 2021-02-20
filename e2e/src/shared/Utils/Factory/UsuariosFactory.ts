import { IUsuario } from "../../trt15-tests/trt15-iusuario";


export const PCPSILVA: IUsuario = {nome: "PAULO SILVA", login: "pcpsilva"};
export const AGRIMM: IUsuario = {nome: "Ana Laura Grimm da Silva", login: "agrimm", lotacao: "Gabinete da Secretaria-Geral Judiciaria", perfil: "Administrador +"};
export const VMF: IUsuario = {nome: "Vinicius Martins Ferraz", login: "viniciusferraz", lotacao: "Secao de Qualidade de Software", perfil: "Administrador +"};
export const GPOLICASTRO: IUsuario = {nome: "Giuliana Pardo Policastro La Guardia", login: "gpolicastro", lotacao: "Coordenadoria de Informacoes Funcionais de Servidores", perfil: "Administrador"};
export const ALEXANDREBALISTA: IUsuario = {nome: "ALEXANDRE ZUPPI BALISTA", login: "alexandrebalista"};
export const ADMIN: IUsuario  = {nome: "ROSEMARY RODRIGUES MIGUEL", login: "rrodrigues"};
export const MAU: IUsuario  = {nome: "Mauricio Rodrigues de Morais", login: "mmorais", senha: "Senha123?", lotacao: "Coordenadoria de Desenvolvimento de Sistemas", perfil: "Administrador"};

export function getTop5FromList(lista: IUsuario[]){
    return lista.slice(0,5);
}
export function getTop10FromList(lista: IUsuario[]){
    return lista.slice(0,10);
}

export function extractListaNomeFromUsuarioLista(lista: IUsuario[]){
    return lista.map(u =>{
        return u.nome;
    });
}