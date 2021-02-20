import { SimNao } from "../Data/Utils";
import { ENUM_GRUPO } from "../Data/EnumGrupo";
import { IPerfilAcesso } from "../../trt15-tests/trt15-iperfil-acesso";

export interface IAplicacao {
    id?: string;
    nome?: string;
    grupo?: ENUM_GRUPO;
    ativo?: SimNao;
    url?: string;
    itemMenuExtranet?: string;
    icone?: string;
    perfisAcessos?: IPerfilAcesso[];
}
