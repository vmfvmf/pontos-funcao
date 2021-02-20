import { EnumPerfilSistema } from "../Utils/Data/Perfil";
import { EnumOrgaoJulgador } from "../Utils/Data/OrgaoJulgador";


export class PerfilOrgaoJulgador{
  perfil: EnumPerfilSistema;
  orgaoJulgador: EnumOrgaoJulgador;

  constructor(perfil: EnumPerfilSistema, oj: EnumOrgaoJulgador){
    this.perfil = perfil;
    this.orgaoJulgador = oj;
  }

  getPerfil(): string {
    return this.orgaoJulgador + " / " + this.perfil;
  }
}

export interface IUsuario {
  perfil?: string;
  lotacao?: string;
  nome?: string;
  login: string;
  cpf?: string;
  senha?: string;
  dt_fim_carreira?: string;
  perfilSelecionar?: PerfilOrgaoJulgador;
}


export function getPerfilUsuario(): string{
    return this.perfilSelecionar.orgaoJulgador + " - " + this.perfilSelecionar.perfil;
  }